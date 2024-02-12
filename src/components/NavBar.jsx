import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import SignIn from "../modals/SignIn";

export default function (){

    const {user} = useUser();

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
                <button
                    onClick={()=>setIsOpen(true)}
                    >SignUp
                </button>
                <button>LogIn</button>
                {user && 
                    <NavLink className='link' to='/user/:user_name'>{`${user.user_name}`}</NavLink>
                }
            </div>
          
        </div>
    )
}