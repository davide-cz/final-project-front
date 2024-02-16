import { useState } from "react"

export default function ({onSearch}){
    
    const [value,setValue]=useState('')
    
    return (
        <>
            <div className='searchbar'> 
                <input 
                    className='inputbar'
                    type="text"
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                />
                <button 
                    onClick={()=>{onSearch(value)}}
                    className="search-button"
                >search</button>
            </div>
        </>
    )
}