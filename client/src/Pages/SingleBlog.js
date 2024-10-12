import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SingleBlog = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [blog,setBlog] = useState({})

    useEffect(() => {
        const fetchsingleBlog = async () => {
           const res = await axios.get(`https://blog-website-full-stack-mu.vercel.app/api/v1/get/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setBlog(res.data.fetchBlogsById
        )
        }
        fetchsingleBlog()
    },[id])
  return (
    <>
      <div className='container shadow my-3'>
        <div className='col-md-12 d-flex items-center justify-content-center bg-light'>
            <div className='row'>
                <h1 className='my-3'>{blog.title}</h1>
                <img
                    src={`https://blog-website-full-stack-mu.vercel.app/${blog.thumbnail}`}
                    className='img img-responsive img-rounded my-3'
                    alt=""
                />
                <p className='my-3'>{blog.description}</p>
            </div>
        </div>
        <button onClick={() => navigate("/")} className='btn btn-primary'>
            Back To Post
        </button>
      </div>
    </>
  )
}

export default SingleBlog
