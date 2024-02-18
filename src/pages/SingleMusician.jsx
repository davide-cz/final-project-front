import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../contexts/UserContext";
import { axiosOpts } from "../Ut/axiosOpt";

export default function (){

    
    const {token}=useUser()
    const {VITE_URI}=import.meta.env
    const {id}=useParams();
    const [musician,setMusician]=useState({})

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians/${id}`, axiosOpts(token))
        .then(res=>{console.log(res.data)
            setMusician(res.data)})
        .catch(error=>console.error(error))
    }
    ,[])

    return(
        <>
            <h3>
                {musician.genre}     
            </h3>
            <p>
                {musician.description}     
            </p>
        </>
    )
}