import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from "axios"
import { toast } from 'react-toastify'

const Login = () => {

    const {setShowLogin,setToken,setUser} = useContext(AppContext)

    const [state, setState] = useState("Login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e)=>{
        e.preventDefault()

        try {
            if(state === "Login"){
              const  {data} =  await axios.post('https://imagify-2-backend.onrender.com/api/user/login' ,{email,password})
              if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem("token",data.token)
                setShowLogin(false)

              }else{
                toast.error(data.message)
              }

            }else{
                const  {data} =  await axios.post('https://imagify-2-backend.onrender.com/api/user/register' ,{name,email,password})
              if(data.success){
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem("token",data.token)
                setShowLogin(false)

              }else{
                toast.error(data.message)
              }

            }
        } catch (error) {
            toast.error(data.message)

        }

    }

    useEffect(() => {
        document.body.style.overflow = "hidden"
        
        return ()=>{
            document.body.style.overflow = 'unset'
        }

    }, [])
    
  return (
    <div className='absolute top-0 left-0 w-full  bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center '>
       <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500 '>
          <h1 className='text-center text-2xl font-medium '>{state}</h1>
          <p>welcome back plese sign in to continue</p>
           
           {state !== "Login" && 
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <img className='w-5' src={assets.profile_icon} alt="" />
              <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder='Full Name' required className='outline-none' />
          </div>}

          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <img className='w-5' src={assets.email_icon} alt="" />
              <input value={email}  onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Email' required className='outline-none' />
          </div>

          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 '>
              <img className='w-5' src={assets.lock_icon} alt="" />
              <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' required className='outline-none' />
          </div>
           <p className='text-blue-500 mt-5 cursor-pointer '>Forgot password ? </p>

           <button type='submit'  className='bg-blue-600 py-2 mb-5 rounded-full text-white w-full mt-5'>{state == "Login"? "Login": "Create Account "}</button>
           {state == "Login" ? 
           <p onClick={()=> setState("Sign Up")} className='text-center  m-2 '>Don't have an account ? <span className='text-blue-600 cursor-pointer'>Sign Up</span></p> :
           <p onClick={()=> setState("Login")} className='text-center '>Already have an account  ? <span className='text-blue-600 cursor-pointer '>login</span></p> 
           }
           <img onClick={()=> setShowLogin(false)} className='absolute top-5 right-5 cursor-pointer ' src={assets.cross_icon} alt="" />

       </form>
    </div>
  )
}

export default Login
