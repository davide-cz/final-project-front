import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function (){

    const [searchValue,setSearchValue] =useState('')

    return(
        <div className="navbar">
            <NavLink to='/'>HomePage</NavLink>
            <NavLink to='/about'>About</NavLink>
            <SearchBar
                onSearch={(searchValue)=>{setSearchValue(searchValue)}}
                //search value definisce il valore che andrà a definire
                //queries di ricerca 
            />
        </div>
    )
}