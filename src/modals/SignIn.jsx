import { useEffect, useRef } from "react"
import { useState } from "react"
import { useUser } from "../contexts/UserContext";


export default function ({isOpen,setIsOpen}){
    


    const { signUp, logIn, error, loading } = useUser();
    //setting finestra modale per iscrizione 
    const dialogRef=useRef()

    useEffect(()=>{
        if(isOpen){
            dialogRef.current.showModal()
        }else{
            dialogRef.current.close()
        }
    },[isOpen])

    const [signInForm,setSignInForm]=useState({
        name:'dada',
        email:'caca@daca.com',
        password:'diomaledetA!'
       /*  birthDate:'',
        instrument:'', */
    })
   
    const signUser=(e)=>{
        e.preventDefault();
        const {userName,password,email}=signInForm;
            signUp(userName,email,password)
    }

    return(
        <>
            <dialog ref={dialogRef}>
                <form onSubmit={signUser}>
                    <label htmlFor="">
                        <p>UserName</p>
                        <input 
                            type="text"
                            value={signInForm.userName}
                            onChange={e=>setSignInForm(curr=>({...curr, userName:e.target.value}))} />
                    </label>
                    <label htmlFor="">
                        <p>Email</p>
                        <input 
                            type="email"
                            value={signInForm.email}
                            onChange={e=>setSignInForm(curr=>({...curr, email:e.target.value}))} />
                    </label>
                    <label htmlFor="">
                        <p>Password</p>
                        <input 
                            type="password"
                            value={signInForm.password}
                            onChange={e=>setSignInForm(curr=>({...curr, password:e.target.value}))} />
                    </label>
                   {/*inserire form per data di nascita*/}     
                    {/*inserire option select con gli strumenti*/}
                    <button>submit</button>
                </form>
                <button 
                    onClick={()=>{
                        setIsOpen(false)
                }}>close</button>
            </dialog>
        </>
    )
}