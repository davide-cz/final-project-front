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
        user_name:'',
        email:'',
        password:''
    })

    const [signInLayout,setSignInLayout]=useState(true)
   
    const signUser=(e)=>{
        e.preventDefault();
        const {user_name,password,email}=signInForm;
        signUp(user_name,email,password)
    }
    const logUser=(e)=>{
        e.preventDefault();
        const {password,email}=signInForm;
        logIn(email,password)

    }

    return(
        <>
        
            <dialog ref={dialogRef} className="dialog-modal">
                <div>
                    <div className="close-button">
                        <button 
                            onClick={()=>{
                                setIsOpen(false)
                        }}>close</button>
                    </div>
                    {signInLayout &&
                    <div className="sign-form">
                        <h2 className="login-title">SignUp</h2>
                        <form onSubmit={signUser}>
                            <label htmlFor="">
                                <p>UserName</p>
                                <input 
                                    type="text"
                                    value={signInForm.user_name}
                                    onChange={e=>setSignInForm(curr=>({...curr, user_name:e.target.value}))} />
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
                            <button onClick={()=>{
                                 setIsOpen(false)
                            }}>submit</button>
                        </form>
                        
                        <button onClick={()=>[
                            setSignInLayout(false)
                        ]}>
                            Already Signed?
                        </button>
                    </div>
                    }
                    {!signInLayout &&
                    <div className="login-form">
                    <h2 className="login-title">LogIn</h2>
                    <form onSubmit={logUser}>
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

                            <button onClick={()=>{
                                setIsOpen(false)
                            }}>submit</button>
                            <button onClick={()=>[
                                setSignInLayout(true)
                                ]}>
                                    Not subscribed?
                        </button>
                        </form>
                    </div>
                 }
                </div>
            </dialog>
        </>
    )
}