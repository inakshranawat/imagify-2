import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user,setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const clickHandler = ()=>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }
  return (
    <div className='flex items-center justify-center flex-col my-20'>
        <div className='px-6 py-1 text-center flex gap-2 rounded-full items-center  text-stone-500 bg-white border border-neutral-500 '>
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt="" />
        </div>
        <h1 className='text-7xl w-[590px] text-center mt-10  '>Turn text to <span className='text-blue-500 '>image</span>, in seconds.</h1>

        
        <p className='text-center w-xl mt-5 '>Unleash the your creativity with AI .Turn your imagination into visuals art in seconds - just type and watch the magc happen</p>

        <button onClick={clickHandler} className='text-white bg-zinc-900 px-12 py-3 border border-gray-500 mt-10 hover:scale-105 transition-all duration-700  rounded-full flex items-center gap-5 '>Generate Images
          <img className='h-6' src={assets.star_group} alt="" />
        </button>

        <div className='flex flex gap-5 mt-10 '>
          {Array(6).fill('').map((item,index)=>(
            
            <div key={index} className='hover:scale-105 '>
               <img  className='h-20 rounded' src={index % 2 == 0 ?assets.sample_img_1: assets.sample_img_2} alt="" />
            </div>
          
          ))}
        </div>
         <p   className='text-stone-500 mt-10 '>Generated images from imagify</p>
    </div>
  )
}

export default Header

