import axios from "axios"
import { useEffect, useState } from "react"
import { useUser } from "../contexts/UserContext";
import MusiciansForm from "../modals/MusiciansForm";
import { axiosOpts } from "../Ut/axiosOpt";
import { Link } from "react-router-dom";

const {VITE_URI}=import.meta.env

export default function (){

    
    const [isOpen,setIsOpen]=useState(false)
    const [refreshList,setRefreshList]=useState(false)
    const [musiciansArray,setMusiciansArray]=useState([])
    const [filteredArray,setFilteredArray]=useState([])
    const [favouritesArray,setFavouritesArray]=useState([])
    
    const {user , token , logOut} = useUser();
    
    //patch su ruolo utente, per pubblicare annuncio devi essere un musicista
    
    const becomeMusician=()=>{
        axios.patch(`${VITE_URI}/user/${user.user_name}`,{...user,role:'musician'} , axiosOpts(token))
        .then(obj=>{console.log('role Changed')})
        .catch(error=>console.error(error))
    }

    useEffect(()=>{
        axios.get(`${VITE_URI}/user/${user.user_name}`, axiosOpts(token))
        .then(res=>{console.log(`connected as ${user.user_name}`)})
    },[becomeMusician])

//chiamata get che recupera tutti i musicisti con id dell'user ATTIVO

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians`, axiosOpts(token))
        .then(res=>{setMusiciansArray(res.data)
            setFilteredArray(res.data
                .filter(mus=>mus.user?._id.includes(`${user?._id}`)))
            })
            .catch(error=>console.error(error))
        },[refreshList]);

    //chiamata che raccoglie i preferiti di USER        

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians`, axiosOpts(token))
        .then(res=>{setMusiciansArray(res.data)
            setFavouritesArray(res.data
                .filter(mus=>mus.favourite_by_user.includes(`${user._id}`)))
            })
            .catch(error=>console.error(error))
        },[refreshList]);


    const [isUserMusican,seIsUserMuscian]=useState(false)

    const deleteInserction=(id)=>{
        axios.delete(`${VITE_URI}/musicians/${id}`, axiosOpts(token))
        .then(console.log(`inserction with id:${id} deleted`))
    }

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
                <div>
                    <p>you can make your own insercions only after becoming 'musician'</p>
                    <p>you will logged out to refresh your state, logIn again to add your own inserctions on this page</p>
                    <button
                        onClick={()=>{
                            becomeMusician()
                            logOut()}
                        }
                    >becomeMusician</button>
                </div>
                
            }
           <div className="modal-wrapper">
                <MusiciansForm 
                    isOpen={isOpen}
                    setIsOpen={c=>setIsOpen(c)}
                />
           </div>
           <div>
            {user.role ==='musician' &&
            <section className="user-inserction">
                <h4>Those are your Inserctions:</h4>
                {filteredArray.map((elem=>{
                    return(
                        <div key={`${elem._id}`}>
                                <Link to={`/musicians/${elem._id}`}>
                                    <h4>id inserction:{`${elem._id}`}</h4>
                                    <p>{`${elem.instrument.principal_instrument}`}</p>
                                </Link>
                                <button onClick={()=>{
                                    deleteInserction(elem._id)
                                    setRefreshList(!refreshList)

                                }}>
                                    delete
                                </button>
                        </div>

                    )
                }))}
            </section>
            
            }
            <div>
                <section className="user-favourites">
                    <h4>your favourites:</h4>
                    {favouritesArray.map((mus,i) =>{
                        return(
                            <div key={`${mus.user_name}${i}`}>
                                <h3>
                                    {mus.title_inserction}-{mus.genre}
                                </h3>
                            </div>
                        )
                    })}
                </section>
            </div>
           </div>
        </>
    )
}