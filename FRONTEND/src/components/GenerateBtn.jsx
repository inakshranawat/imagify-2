import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
    const navigate = useNavigate()
  return (
     <div className='flex flex-col gap-10 items-center justify-center ' >
        <h1 className='text-3xl font-semibold '>See the magic . Try now </h1>
        <button onClick={()=> navigate('/result')} className='bg-zinc-900 mb-20 flex gap-5 text-white px-12 py-2 rounded-full border border-gray-400 hover:scale-105 transition-all duration-700 '>Generate Image 
            <img className='h-6 ' src={assets.star_group} alt="" />
        </button>
     </div>
  )
}

export default GenerateBtn