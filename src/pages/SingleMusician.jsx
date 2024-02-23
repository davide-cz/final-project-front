import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../contexts/UserContext";
import { axiosOpts } from "../Ut/axiosOpt";

export default function (){

    
    const {user,token}=useUser()
    const {VITE_URI}=import.meta.env
    const {VITE_VERCEL_URI}=import.meta.env
    const {id}=useParams();
    const [musician,setMusician]=useState({});
    const [isAddToFav,setIsAddToFav]=useState(false)
    const [isRemoveToFav,setIsRemoveToFav]=useState(false)

    const navigate=useNavigate()

    const deleteInserction=(id)=>{
        axios.delete(`${VITE_URI}/musicians/${id}`, axiosOpts(token))
        .then(console.log(`inserction with id:${id} deleted`))
        .catch(error=>console.error(error))
    }

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians/${id}`, axiosOpts(token))
        .then(res=>{console.log(res.data)
            setMusician(res.data)})
        .catch(error=>console.error(error))
    }
    ,[])

    //funzione che aggiunge id inserzione all'array favourite_musicians
    const addToUserFavourites=()=>{
        axios.patch(`${VITE_URI}/user/${user.user_name}`,
            {...user,
                favourite_musicians:[...[musician._id]],
            }
            , axiosOpts(token))
            .then(res=>{console.log(res.data)})
            .catch(error=>console.error(error))
    };
     //funzione onClick che rimuove id musician da user favourite_musicians
const removeFromUserFavourites = async () =>{
    for (let i = 0 ; i<user.favourite_musicians.length ; i++){
        if(user.favourite_musicians[i] == musician._id){
            await axios.patch(`${VITE_URI}/user/${user.user_name}`,
                {...user,
                    favourite_musicians:[user.favourite_musicians.splice(i,1)]
                }
                , axiosOpts(token))
        }
    }
}

    
    //funzione onClick che aggiunge id user favourite_by_user
const addToFavourites=()=>{
    axios.patch(`${VITE_URI}/musicians/${id}`,
        {...musician,
            favourite_by_user:[...[user._id]],
        }
        , axiosOpts(token))
        .then(res=>{console.log(res.data)})
        .catch(error=>console.error(error))
};
 //funzione onClick che romuove id user favourite_by_user
const removeFavourites = async () =>{
    for (let i = 0 ; i<musician.favourite_by_user.length ; i++){
        let currentArray=musician.favourite_by_user
        if(currentArray[i] === user._id){
            currentArray.splice(i,1)
            await axios.patch(`${VITE_URI}/musicians/${id}`,
                {musician,
                favourite_by_user:currentArray
                }
                , axiosOpts(token))
        }
    }
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
                        <div className="user-info">
                            <h4>
                                {musician.user?.user_name} 
                            </h4>
                            <h3>
                                {musician.genre}     
                            </h3>
                            {user.role==='admin' && 
                            //button per delete by ADMIN
                                <button 
                                    className="delete"
                                    onClick={()=>{
                                    deleteInserction(id)
                                    navigate('/musicians')
                                }}>
                                    delete
                                </button>
                            }
                        </div>
                    </div>
                    <div>
                        <h3>
                            {musician?.title}     
                        </h3>
                        <h6> About me:</h6>
                        <p className="mus-description">
                           {musician.description}     
                        </p>
                        <h6>
                            price for the request:
                        </h6>
                        <p>
                            {musician.pricing} €/h     
                        </p>
                        <button onClick={()=>{
                            addToFavourites()
                           /*  addToUserFavourites() */
                        }}>
                            add to favourites
                        </button>
                        <button onClick={()=>{
                            removeFavourites()
                           /*  removeFromUserFavourites() */
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