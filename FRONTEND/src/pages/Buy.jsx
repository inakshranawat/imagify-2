import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Buy = () => {

  const {user,setShowLogin , loadsCreditData , token } = useContext(AppContext)

  const navigate = useNavigate()

  const initPay = async (order)=>{
      const options = {

        key:"rzp_test_RAZ0S4NuYQQ6NK",
        amount:order.amount,
        currency:order.currency,
        name: "Credits Payment",
        description: "Credits Payment",
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response)=>{
          try {
            const {data} = await axios.post('http://localhost:4000/api/user/verify-razor',response,{headers: {token}})
            if(data.success){
              loadsCreditData()
              navigate('/')
              toast.success('Credit added ')
              
            }
            
          } catch (error) {
            toast.error(error.message)
            
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
  }

  const paymentRazorpay = async (planId)=>{
     try {
        if(!user){
          setShowLogin(true)

        }
      const {data} =  await axios.post('http://localhost:4000/api/user/pay-razor',{planId}, {headers: {token}})
      if(data.success){
        initPay(data.order)

      }
     } catch (error) {
      toast.error(error.message)
      
     }
  }
  return (
    <div className='h-screen text-center pt-14 mb-10'>
       <button className='border border-gray-400 px-10 py-2 rounded-full mb-6 '>Ours plans 

       </button>
       <h1 className='text-center text-3xl font-medium mb-6 '>choose the plan</h1>

       <div className='flex flex-wrap justify-center gap-6 text-left '>
        {plans.map((item,index)=>(
            <div key={index} className='bg-white drop-shadow rounded-lg  py-12 px-8 text-gray-600 hover:scale-105'>
              <img width={40} src={assets.logo_icon} alt="" />
              <p className='mt-3 mb-1 font-semibold '>${item.id}</p>
              <p className='text-sm '>${item.desc}</p>
              <p className='mt-6 '><span className='text-3xl font-semibold '>${item.price}</span>/{item.credits} credits</p>

              <button onClick={()=> paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 w-52 py-2.5 rounded-md '>{user ? "Purchase": "Get Started"}</button>
            </div>
        ))}
       </div>
    </div>
  )
}

export default Buy