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
    //patch su ruolo utente, per pubblicare annuncio devi essere un musicista
    
    const becomeMusician=()=>{
        axios.patch(`${VITE_URI}/user/:${user.user_name}`,{...user,role:'musician'})
        .then(obj=>{console.log('role Changed')})
        .catch(error=>console.error(error))
    }

    useEffect(()=>{
        axios.get(`${VITE_URI}/user/${user.user_name}`)
        .then(res=>{console.log(`connected as ${user.user_name}`)})
    },[becomeMusician])


    const [isUserMusican,seIsUserMuscian]=useState(false)

    return (
        <>
            <h3>{`${user.user_name}`}</h3>
            <p>
                Hello,this is {`${user.user_name}`} page.
            </p>
            {user.role==='musician' &&
                <button
                    onClick={()=>setIsOpen(true)}
                >add musician</button>            
            }
            {
                user.role==='user' &&
                <button
                    onClick={()=>becomeMusician()}
                >becomeMusician</button>
                
            }
           <div className="modal-wrapper">
                <MusiciansForm 
                    isOpen={isOpen}
                    setIsOpen={c=>setIsOpen(c)}
                />
           </div>
        </>
    )
}