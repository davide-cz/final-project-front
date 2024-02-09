import axios from "axios";
import { createContext, useState } from "react";

const {VITE_MONGO_URI} = import.meta.env;

const UserContext=createContext();

export const UserProvider = ({children}) =>{

    const [user,setUser]=useState(null);

    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);

    const signUp = async (email,password)=>{
        if(loading)   return;
//se sta caricando setto loading a true 
        setError(null);
        setLoading(true);
        try{
            //raccolgo user da email e password e con metodo axios-post alla route signUp
            //user diventa il value di data 
            const body={email,password};
            const {data:user}= await axios.post(`${VITE_MONGO_URI}/signup` , body);
            setUser(user)
        }catch(error){
            console.error(error);
            setError(error.response.user);
        }finally{
            setLoading(false);
        }
    };

    const logIn = async (email, password) => {

        if(loading) return;

        setError(null);
        setLoading(true);

        try{
            const body = {email, password};
            const { data: user } = await axios.post(`${VITE_MONGO_URI}/signup` , body);
            setUser(user);
        }catch(error){
            console.error(error);
            setError(error.response.user);
        }finally{
            setLoading(false);
        }

    };
    
    const logOut = () => {
        setUser(null);
    }

    const value = {
        user,
        signUp,
        logIn,
        logOut,
        error,
        loading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error('useUser must be used within a UserProvider.')
    }
    return context;
}