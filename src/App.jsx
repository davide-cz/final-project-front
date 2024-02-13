import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Musicians from './pages/Musicians'
import { useUser } from './contexts/UserContext'
import User from './pages/User'
import SignIn from './modals/SignIn'

function App() {

  const{user}=useUser()

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={!user ? <SignIn type='signup'/> : <Navigate to="/"/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/user/:user_name' element={<User/>}/>
        <Route path='/musicians' element={<Musicians/>}/>
      </Routes>
    </>
  )
}

export default App
