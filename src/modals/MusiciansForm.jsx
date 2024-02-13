import { useEffect, useRef } from "react"
import { useState } from "react"
import { useUser } from "../contexts/UserContext";
import axios from "axios";



export default function ({isOpen,setIsOpen}){
    
    const {VITE_URI} = import.meta.env;
    
    const {user} = useUser();


    const { signUp, logIn, error, loading } = useUser();

    const [instrumentsArray,setInstrumentsArray]=useState([]);

    const dialogRef=useRef()

    useEffect(()=>{
        if(isOpen){
            dialogRef.current.showModal()
        }else{
            dialogRef.current.close()
        }
    },[isOpen])

    useEffect(()=>{axios.get(`${VITE_URI}/instruments`)
        .then(obj=>{setInstrumentsArray(obj.data)
            console.log(obj.data)})
        .catch(error=>console.error(error));
    },[])

    const [musicianForm,setMusicianForm]=useState({
        user_name:user,
        instrument:'',
        genre:'',
        description:'',
    });

    const addMusician=(obj,date)=>{
        axios.post(`${VITE_URI}/musicians`,obj)
        .then(()=>console.log('musician was added'))
        .catch((error)=>console.error(error))
    };


    return(
        <>
            <dialog ref={dialogRef} className="dialog-modal">
                <div className="close-button">
                    <button 
                        onClick={()=>{
                            setIsOpen(false)
                    }}>close</button>
                </div>
                <h4>{user.user_name}</h4>
                <select 
                    value={musicianForm.instrument}
                    onChange={e=>setMusicianForm(curr=>({...curr, instrument:e.target.value}))}>
                    select an instrument
                    {instrumentsArray.map(((instr , i)=>{
                        return(
                        <option key={`${instr}${i}`} value={`${instr._id}`}>
                            {`${instr.principal_instrument}`} - {`${instr.role}`}
                        </option>
                        )
                    }))}
                </select>
                <p>genre</p>
                <input 
                    type="text"value={musicianForm.genre}
                    onChange={e=>setMusicianForm(curr=>({...curr, genre:e.target.value}))} />
                <p>description</p>
                <input 
                    type="text"
                    onChange={e=>setMusicianForm(curr=>({...curr, description:e.target.value}))} />
                <button onClick={()=>{
                    addMusician(musicianForm)

                }}>Sign</button>
            </dialog>
        </>
    )
}