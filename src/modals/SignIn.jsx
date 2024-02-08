import { useEffect, useRef } from "react"
import { useState } from "react"

export default function ({isOpen,setIsOpen}){
    
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
        first_name:'',
        last_name:'',
        userName:'',
        email:'',
        password:'',
        birthDate:'',
        instrument:'',
        genre:'',
    })

    

    return(
        <>
            <dialog ref={dialogRef}>
                <form action="" onSubmit={e=>e.preventDefault()}>
                    <label htmlFor="">
                        <p>First Name</p>
                        <input 
                            type="text"
                            value={signInForm.first_name}
                            onChange={e=>setSignInForm(curr=>({...curr, first_name:e.target.value}))} />
                    </label>
                    <label htmlFor="">
                        <p>Last Name</p>
                        <input 
                            type="text"
                            value={signInForm.last_name}
                            onChange={e=>setSignInForm(curr=>({...curr, last_name:e.target.value}))} />
                    </label>
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
                    <label htmlFor="">
                        <p>BirthDate</p>
                        <input 
                            type="date"
                            value={signInForm.birthDate}
                            onChange={e=>setSignInForm(curr=>({...curr, birthDate:e.target.value}))} />
                    </label>
                    <label htmlFor="">
                        <p>genre</p>
                        <input 
                            type="text"
                            value={signInForm.genre}
                            onChange={e=>setSignInForm(curr=>({...curr, genre:e.target.value}))}/>
                    </label>
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