import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/NotFound'
import NavBar from './components/NavBar'
import Musicians from './pages/Musicians'
import { useUser } from './contexts/UserContext'
import ActiveUser from './pages/User'
import SignIn from './modals/SignIn'
import User from './pages/User'
import SingleMusician from './pages/SingleMusician'
import NotFound from './pages/NotFound'

function App() {

  const{user}=useUser()

  return (
    <div className='main-app'>
      <NavBar/>
      <hr className='nav-interupter'/>
      <div className='app-body'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/signup" element={!user ? <SignIn/> : <Navigate to="/"/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/user' element={<ActiveUser/>}/>
          <Route path='/musicians' element={<Musicians/>}/>
          <Route path='/musicians/:id' element={<SingleMusician/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
