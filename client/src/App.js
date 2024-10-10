import React from 'react'
import { Route, Routes } from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Header from './Components/Header'
import AddBlog from './Pages/AddBlog'
import AddCategory from './Pages/AddCategory'
import SingleBlog from './Pages/SingleBlog'
import PrivateRoute from './Services/ProtectedRoutes'
const App = () => {
  return (
    <>
      <Header/>
       <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/" element={<PrivateRoute/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/add-blog" element={<AddBlog/>} />
           {/* <Route path="/add-category" element={<AddCategory/>} /> */}
            <Route path="/blog/:id" element={<SingleBlog/>} />
          </Route>

       </Routes>
    </>
  )
}

export default App