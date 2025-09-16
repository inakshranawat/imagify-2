import React, { lazy, useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async  (e)=>{
    e.preventDefault()
    setLoading(true)
    if(input){
      const image  = await  generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    
    <>
    <form onSubmit={onSubmitHandler} className='flex flex-col  items-center justify-center ' >


    <div>
      <div className='relative  mt-20'>
         <img className='rounded  w-sm' src={image} alt="" />
         <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 w-full ${loading ? 'w-full transition-all duration-[10s]':'w-0'}`}></span>
      </div>
      <p className={!loading ? `hidden`: 'block'} >Loading...</p>
    </div>
    {!isImageLoaded ?
     <div className='flex  w-1/2 rounded-full px-3 py-2 mt-20 '>
        <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder='describe what you want to generate ' className='flex-1 bg-zinc-400 rounded-full px-5  outline-none ml-8  ' />
        <button type='submit' className='bg-zinc-900 px-16 py-3 rounded-full text-white  '>Generate</button>
     </div> :
      
      <div className='flex  flex-wrap gap-5 justify-center items-center  rounded-full mt-20 '>
        <p onClick={()=> setIsImageLoaded(false)} className='cursor-pointer bg-transparent border border-gray-800/100 text-black px-5 py-3 rounded-full '>Generate another</p>
        <a className='cursor-pointer bg-zinc-700 text-white px-10 py-3  rounded-full ' download href={image}>Download</a>
      </div>}
    </form>

    </>
  )
}

export default Result