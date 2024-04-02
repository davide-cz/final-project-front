import { useEffect, useRef } from "react"
import { useState } from "react"
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { axiosOpts } from "../Ut/axiosOpt";
import { useParams } from "react-router-dom";



export default function ({isOpen,setIsOpen}){
    
    const {VITE_URI} = import.meta.env;
    
    const {user , token , error} = useUser();

    const [instrumentsArray,setInstrumentsArray]=useState([]);
    const [refresh,setRefresh]=useState(false);
    
    const {id}=useParams()

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
        user:user?._id,
        instrument:'',
        title_inserction:'',
        genre:'',
        description:'',
        pricing:0
    });

    useEffect(()=>{axios.get(`${VITE_URI}/musicians/${id} ` ,  axiosOpts(token))
        .then(obj=>{setMusicianForm(obj.data)
            console.log(obj.data)})
        .catch(error=>console.error(error));
    },[])

    const editInserction=()=>{
        const body = {};
        Object.entries(musicianForm).forEach(([key, value]) => {
            
            if(value){
                body[key] = value;
            }
        })
        axios.patch(`${VITE_URI}/musicians/${id}`, body ,  axiosOpts(token))
        .then(res => {
            setMusicianForm(res.data)
            setIsOpen(false)})
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
                        <p>Instrument</p>
                        <input 
                            type="text"value={musicianForm.title_inserction}
                            onChange={e=>setMusicianForm(curr=>({...curr, title_inserction:e.target.value}))} />
                        <p>Genre</p>
                        <input 
                            type="text"value={musicianForm.genre}
                            onChange={e=>setMusicianForm(curr=>({...curr, genre:e.target.value}))} />
                        <p>Price/h : €</p>
                        <input 
                            type="number"value={musicianForm.pricing}
                            onChange={e=>setMusicianForm(curr=>({...curr, pricing:e.target.value}))} />
                        <p>description</p>
                        <input
                            onChange={e=>setMusicianForm(curr=>({...curr, description:e.target.value}))} />
                </form>
                <button disabled={error}
                    onClick={()=>{
                    editInserction()
                    setIsOpen(error ? true : false)
                    setRefresh(!refresh)
                }}>edit</button>
            </dialog>
            {error && <div className="error">{error}</div>}
        </>
    )
}