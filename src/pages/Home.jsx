import { useState } from "react";
import SignIn from "../modals/SignIn";

export default function (){

    
    const [isOpen,setIsOpen]=useState(false)

    return (
        <>
            <h3>This is the Homepage</h3>
            <p>
                Hello, this is an app that allows you to collaborate with pro and amateur musicians for your own music projects
            </p>
            <button onClick={()=>setIsOpen(true)}>Log/Sign</button>
            <div className="modal-wrapper">
                <SignIn
                isOpen={isOpen}
                setIsOpen={c=>setIsOpen(c)}/>
            </div>
        </>
    )
}