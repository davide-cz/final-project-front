import axios from "axios"
import { useEffect, useState } from "react"
import { useUser } from "../contexts/UserContext";
import MusiciansForm from "../modals/MusiciansForm";
import { axiosOpts } from "../Ut/axiosOpt";
import { Link } from "react-router-dom";

const {VITE_VERCEL_URI}=import.meta.env
const {VITE_URI}=import.meta.env

export default function (){

    
    const [isOpen,setIsOpen]=useState(false)
    const [musiciansArray,setMusiciansArray]=useState([])
    const [filteredArray,setFilteredArray]=useState([])
    
    const {user , token} = useUser();
    console.log(user)
    
    //patch su ruolo utente, per pubblicare annuncio devi essere un musicista
    
    const becomeMusician=()=>{
        axios.patch(`${VITE_URI || VITE_VERCEL_URI}/user/${user.user_name}`,{...user,role:'musician'} , axiosOpts(token))
        .then(obj=>{console.log('role Changed')})
        .catch(error=>console.error(error))
    }

    useEffect(()=>{
        axios.get(`${VITE_VITE_URI || VITE_VERCEL_URIURI}/user/${user.user_name}`, axiosOpts(token))
        .then(res=>{console.log(`connected as ${user.user_name}`)})
    },[becomeMusician])

//chiamata get che recupera tutti i musicisti con id dell'user ATTIVO

    useEffect(()=>{
        axios.get(`${VITE_URI || VITE_VERCEL_URI}/musicians`, axiosOpts(token))
        .then(res=>{setMusiciansArray(res.data)
            setFilteredArray(res.data
                .filter(mus=>mus.user?._id.includes(`${user?._id}`)))
            })
            .catch(error=>console.error(error))
        },[]);
        console.log(filteredArray)


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
           <div>
            {user.role ==='musician' &&
            <div>
                <h4>Those are your Inserctions:</h4>
                {filteredArray.map((elem=>{
                    return(
                        <Link to={`/musicians/${elem._id}`}>
                            <h4>id inserction:{`${elem._id}`}</h4>
                            <p>{`${elem.instrument.principal_instrument}`}</p>
                        </Link>
                    )
                }))}
            </div>
            }
           </div>
        </>
    )
}