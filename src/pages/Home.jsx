import { useState } from "react";
import SignIn from "../modals/SignIn";
import MusicianCard from "../components/MusicianCard";

export default function (){

    
    const [isOpen,setIsOpen]=useState(false)

    return (
        <>
            <div className="jumbo-wrapper">
                <div className="jumbo">
                    <h3>Welcome to JamMee</h3>
                    <h4>the greatest musicians's community of pizzo calabro</h4>
                    <p>
                        request performances made by amateur and pro musician
                        from all over the neighborhood 
                    </p>
                    <p>Join now to see what the neighborhood has to offer!</p>
                    <button onClick={()=>setIsOpen(true)}>Log/Sign</button>
                </div>
            </div>
            <div className="modal-wrapper">
                <SignIn
                isOpen={isOpen}
                setIsOpen={c=>setIsOpen(c)}/>
            </div>
        </>
    )
}