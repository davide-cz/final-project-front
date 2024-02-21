import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useUser } from "../contexts/UserContext";
import { axiosOpts } from "../Ut/axiosOpt";

export default function (){

    
    const {user,token}=useUser()
    const {VITE_URI}=import.meta.env
    const {VITE_VERCEL_URI}=import.meta.env
    const {id}=useParams();
    const [musician,setMusician]=useState({})

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians/${id}`, axiosOpts(token))
        .then(res=>{console.log(res.data)
            setMusician(res.data)})
        .catch(error=>console.error(error))
    }
    ,[])

    //e aggiunge id inserzione all'array favourite_musicians
    
    //funzione onClick che aggiunge id user favourite_by_user
const addingToFavourites=()=>{
    axios.patch(`${VITE_URI}/musicians/${id}`,
        {...musician,
            favourite_by_user:[...[user._id]],
        }
        , axiosOpts(token))
        .then(res=>{console.log(res.data)})
        .catch(error=>console.error(error))
}
const removeFavourites = async () =>{
    for (let i = 0 ; i<musician.favourite_by_user.length ; i++){
        if(musician.favourite_by_user[i] == user._id){
            await axios.patch(`${VITE_URI}/musicians/${id}`,
                {...musician,
                favourite_by_user:[musician.favourite_by_user.splice(i,1)]
                }
                , axiosOpts(token))
        }
    }
    console.log(musician ,'favorite removed')
}

    return(
        <>
            {user && 
            <div className="inserction-layout">
                <figure className="main-img">
                    <img src="https://source.unsplash.com/random/800x500?studio" alt="inserction img" />
                </figure>
                <div className="user-profile-section">
                    <div className="user-section">
                        <figure className="prof-pic-inserction" >
                            <img src="https://source.unsplash.com/random/200x200?portrait" alt="profile img" />
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
                        <button onClick={()=>{
                            addingToFavourites()
                        }}>
                            add to favourites
                        </button>
                        <button onClick={()=>{
                            removeFavourites()
                        }}>
                            remove from favourites
                        </button>
                    </div>
                </div>
            </div>
            }
            {!user && 
            <h2>Must be logged to see this Inserction!</h2>
            
            }
        </>
    )
}