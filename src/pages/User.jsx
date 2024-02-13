import axios from "axios"
import { useEffect, useState } from "react"
import { useUser } from "../contexts/UserContext";
import MusiciansForm from "../modals/MusiciansForm";

const {VITE_MONGO_URI}=import.meta.env
const {VITE_URI}=import.meta.env

export default function (){

    
    const [isOpen,setIsOpen]=useState(false)
    
    const {user} = useUser();
    console.log(user)

    useEffect(()=>{
        axios.get(`${VITE_URI}/user/${user.user_name}`)
        .then(res=>{console.log(`connected as ${user.user_name}`)})
    },[])
    return (
        <>
            <h3>{`${user.user_name}`}</h3>
            <p>
                Hello,this is {`${user.user_name}`} page.
            </p>
            <button
                onClick={()=>setIsOpen(true)}
            >add musician</button>
           <div className="modal-wrapper">
                <MusiciansForm 
                    isOpen={isOpen}
                    setIsOpen={c=>setIsOpen(c)}
                />
           </div>
        </>
    )
}