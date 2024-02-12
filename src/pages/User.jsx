import axios from "axios"
import { useEffect } from "react"
import { useUser } from "../contexts/UserContext";

const {VITE_MONGO_URI}=import.meta.env
const {VITE_URI}=import.meta.env

export default function (){
    
    const {user} = useUser();
    console.log(user)

    useEffect(()=>{
        axios.get(`${VITE_URI}/user/${user.user_name}`)
        .then(res=>{console.log(res.data)})
    },[])
    return (
        <>
            <h3>{`${user.user_name}`}</h3>
            <p>
                Hello,this is {`${user.user_name}`} page.
            </p>
            <button>useless button</button>
        </>
    )
}