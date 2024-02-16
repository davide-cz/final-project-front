import axios from "axios";
import { useEffect, useState } from "react"
import MusicianCard from "../components/MusicianCard";
import { useUser } from "../contexts/UserContext";
import { axiosOpts } from "../Ut/axiosOpt";

export default function (){

    const {token}=useUser()
    
    const {VITE_URI}=import.meta.env
    
    const [musiciansArray,setMusiciansArray]=useState([]);

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians`, axiosOpts(token))
        .then(res=>{setMusiciansArray(res.data)
                        console.log(res.data)})
        .catch(error=>console.error(error))
    },[])

    return (
        <>
            <h3>This is the Musicianspage</h3>
            <p>
                Hello, those are the results of search
            </p>
            <div className="musician-reel" >
                {musiciansArray.map(mus=>{
                    return(
                        <MusicianCard
                            key={mus._id}
                            name={mus.user?.user_name}
                            instrument={mus.instrument.principal_instrument}
                            genre={mus.genre}
                        />
                    )
                })}
            </div>
            <button>Let's start</button>
        </>
    )
}