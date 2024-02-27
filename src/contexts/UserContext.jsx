import axios from "axios";
import { createContext, useContext, useState } from "react";
import useStorage from "../hooks/useStorage";

const {VITE_URI} = import.meta.env;

const UserContext=createContext();

export const UserProvider = ({children}) =>{

    const [data,setData]=useStorage(null);

    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);

    const signUp = async (user_name,email,password)=>{
        if(loading)   return;
//se sta caricando setto loading a true 
        setError(null);
        setLoading(true);
        try{
            //raccolgo user da email e password e con metodo axios-post alla route signUp
            //user diventa il value di data 
            const body={email,password,user_name};
            const {data}= await axios.post(`${VITE_URI}/user/signup` , body);
            setData(data)
            console.log(data)
        }catch(error){
            console.error(error);
            setError(error.response.data)
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
            const { data } = await axios.post(`${VITE_URI}/user/login` , body);
            setData(data);
        }catch(error){
            console.error(error);
            setError(error.response.data);
        }finally{
            setLoading(false);
        }

    };
    
    const logOut = () => {
        setData(null);
    }

    const value = {
        ...data,
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