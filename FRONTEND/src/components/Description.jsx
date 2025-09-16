import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center gap-5 justify-center my-24 p-6'>
        <h1 className='text-3xl font-semibold mb-2  ' >Create  AI Images</h1>
        <p className='mb-8 text-gray-500 '>Turn your imagination into visuals </p>

        <div className='flex gap-15  '>
            <img className='w-80 rounded-lg ' src={assets.sample_img_1} alt="" />
            <div className='mt-10 w-170 flex text-zinc-600 flex-col gap-5 '>
                <h2 className='text-3xl '>Introducing the AI-Powered Text to image Generator </h2>
                <p>Easily bring your ideas to life with our free AI image generator . whether you need stunning visuals or
                    unique imagery . our tools turn your imagination into the eye-catching images with the just few clicks.
                    Imagine it , describe it and watch it come to the life instantly .
                </p>
                <p>Simply type in text prompt , and our cutting edge AI will generate the hight quality images
                    in seconds . From product visuals to character design and portraits , even concepts that
                    dont yet exist can be visualized effortlessly . Powered by advanced AI technology ,the creative 
                    possibilites are limitless. </p>
            </div>
        </div>
    </div>

  )
}

export default Description