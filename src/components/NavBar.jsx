import { NavLink, Navigate, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import SignIn from "../modals/SignIn";
import ActiveUser from "../pages/User";

export default function (){

    const navigate=useNavigate()
    
    const {user , signUp, logIn , logOut, error, loading} = useUser();


    return(
        <div className="navbar">
            <div className="navlinks">
                <NavLink className='link' to='/'>
                    <figure className="logo">
                        <img src="/logo.png" alt="" />
                    </figure>
                </NavLink>
                <NavLink className='link' to='/Musicians'>Musicians</NavLink>
            </div>
           
            <div>
                {!user && 
                <div>
                    <NavLink className='link' to='/'>SignUp/LogIn</NavLink>
                </div>
                
                }
                {user && 
                <div className="name-and-logout">
                    <NavLink className='link' to='/user'>{`${user.user_name}`}</NavLink>
                    <button 
                        onClick={()=>{
                            {logOut()
                            navigate('/')}}}
                    >LogOut</button>
                </div>
                }
            </div>
          
        </div>
    )
}