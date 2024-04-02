import { useEffect, useRef } from "react"
import { useState } from "react"
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { axiosOpts } from "../Ut/axiosOpt";



export default function ({isOpen,setIsOpen,refresh}){
    
    const {VITE_URI} = import.meta.env;
    
    const {user , token} = useUser();


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
        .then(obj=>{setInstrumentsArray(obj.data)})
        .catch(error=>console.error(error));
    },[])

    const [musicianForm,setMusicianForm]=useState({
        user:user._id,
        instrument:'',
        title_inserction:'',
        genre:'',
        description:'',
        pricing:0
    });

    const addMusician=(obj)=>{
        axios.post(`${VITE_URI}/musicians`,obj, axiosOpts(token))
        .then(()=>console.log('musician was added'))
        .catch((error)=>console.error(error))
    };

    
    const editInserction=(_id)=>{
        const body = {};
        Object.entries(musicianForm).forEach(([key, value]) => {
            if(value){
                body[key] = value;
            }
        })
        axios.patch(`${VITE_URI}/musicians/${musician._id}`, body)
        .then(res => {
            setMusicianForm(res.data);
            setIsOpen(false);
        })
        .catch(err => {
            console.error(err);
        });
    }

    return(
        <>
            <dialog ref={dialogRef} className="dialog-modal">
                <div className="close-button">
                    <button 
                        onClick={()=>{
                            setIsOpen(false)
                    }}>close</button>
                </div>
                <form 
                    className='musician-form' 
                    action="">
                        <h4>{user.user_name}</h4>
                        <select 
                            value={musicianForm.instrument._id}
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
                            type="text"value={musicianForm.title_inserction}
                            onChange={e=>setMusicianForm(curr=>({...curr, title_inserction:e.target.value}))} />
                        <p>title</p>
                        <input 
                            type="text"value={musicianForm.genre}
                            onChange={e=>setMusicianForm(curr=>({...curr, genre:e.target.value}))} />
                        <p>Price/h : €</p>
                        <input 
                            type="number"value={musicianForm.pricing}
                            onChange={e=>setMusicianForm(curr=>({...curr, pricing:e.target.value}))} />
                        <p>description</p>
                        <input
                            type="text"
                            onChange={e=>setMusicianForm(curr=>({...curr, description:e.target.value}))} />
                </form>
                <button onClick={()=>{
                    addMusician(musicianForm)
                    setIsOpen(error ? true : false)
                    refresh(false)
                }}>Sign</button>
                
            </dialog>
            {error && <div className="error">{error}</div>}
        </>
    )
}