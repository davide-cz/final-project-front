import { NavLink, Navigate, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import SignIn from "../modals/SignIn";
import ActiveUser from "../pages/User";

export default function (){

    const navigate=useNavigate()
    
    const {user , signUp, logIn , logOut, error, loading} = useUser();

    const [searchValue,setSearchValue] =useState('')

    return(
        <div className="navbar">
            <div>
                <NavLink className='link' to='/'>HomePage</NavLink>
                <NavLink className='link' to='/about'>About</NavLink>
                <NavLink className='link' to='/Musicians'>Musicians</NavLink>
            </div>
            <div >
                <SearchBar
                    onSearch={(searchValue)=>{setSearchValue(searchValue)}}
                    //search value definisce il valore che andrà a definire
                    //queries di ricerca 
                />
            </div>
            <div>
                {!user && 
                <div>
                    <button>
                        <NavLink className='link' to='/'>SignUp/LogIn</NavLink>
                    </button>
                </div>
                
                }
                {user && 
                <div>
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