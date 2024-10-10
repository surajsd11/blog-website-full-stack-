import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get(
          "https://66725723-b512-42c1-9e7d-e2082c15d40b-00-3erfq85ovd6zs.sisko.replit.dev/api/v1/get/allblogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
     
        setBlogs(res.data.fetchAllBlogs);  

      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchAllBlogs();
  }, []);  


  return (
    <>
      <main className='my-5'>
        <div className='container shadow-lg'>
          <section className='text-center'>
            <h2 className='mb-5 my-3'>
              <strong>Latest posts</strong>
            </h2>

            <div className='row'>
              {Array.isArray(blogs) &&
                blogs.map((item) => {
                  return (
                    <div className='col-lg-4 col-md-12 mb-4' key={item._id}>
                      <div className='card'>
                        <div
                          className='bg-image hover-overlay ripple'
                          data-mdb-ripple-color='light'
                        >
                          <img
                            src={`https://66725723-b512-42c1-9e7d-e2082c15d40b-00-3erfq85ovd6zs.sisko.replit.dev/${item.thumbnail}`}
                            className='img-fluid'
                            alt={item.title}
                          />
                          <a href='#'>
                            <div
                              className='mask'
                              style={{ backgroundColor: 'rgba(251,251,251,0.15)' }}
                            ></div>
                          </a>
                        </div>
                        <div className='card-body'>
                          <h5 className='card-title'>{item.title}</h5>
                          <p className='card-text'>{item.description}</p>
                          <Link to={`/blog/${item._id}`} className='btn btn-primary'>
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      </main>

      <footer className='bg-primary text-lg-start'>
        <div className='text-center p-3 text-white'>
          @2024 Copyright :
          <h3 className='text-white mx-2'>Suraj Singh</h3>
        </div>
      </footer>
    </>
  );
};

export default Home;
