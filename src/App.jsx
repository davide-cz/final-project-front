import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'
import Musicians from './pages/Musicians'
import { useUser } from './contexts/UserContext'
import User from './pages/User'

function App() {

  const{user}=useUser()

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/user/:user_name' element={<User/>}/>
        <Route path='/musicians' element={<Musicians/>}/>
      </Routes>
    </>
  )
}

export default App
