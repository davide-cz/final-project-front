import { useState } from "react"

export default function (onSearchValue){
    
    const [value,setValue]=useState('')
    
    return (
        <>
            <input 
                type="text"
                value={value}
                onChange={(e)=>{setValue(e.target.value)}}
             />
             <button 
                onClick={()=>{
                    onSearchValue(value)
                }}>search</button>
        </>
    )
}