import { useState } from "react"

export default function ({onSearch}){
    
    const [value,setValue]=useState('')
    
    return (
        <>
            <input 
                type="text"
                value={value}
                onChange={(e)=>{setValue(e.target.value)}}
            />
            <button 
                onClick={()=>{onSearch(value)}}
            >search</button>
        </>
    )
}