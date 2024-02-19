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
            <div className="inserction-layout">
                <figure className="main-img">
                    <img src="https://source.unsplash.com/random/800x500?studio" alt="inserction img" />
                </figure>
                <div className="user-profile-section">
                    <div className="user-section">
                        <figure>
                            <img src="https://source.unsplash.com/random/150x200?portrait" alt="profile img" />
                        </figure>
                        <div>
                            <h4>
                                {musician.user?.user_name} 
                            </h4>
                            <h3>
                                {musician.genre}     
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h3>
                            {musician?.title}     
                        </h3>
                        <p>
                            {musician.description}     
                        </p>
                        <p>price for the request:
                            {musician.pricing}     
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}