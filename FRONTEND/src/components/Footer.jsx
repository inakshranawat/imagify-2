import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex mb-10 items-center justify-between  gap-4 py-3 mt-20 '>
        <img src={assets.logo} alt="" />
        <p className='flex-1'>copyright @nakshranawat | All right reserved.</p>

        <div className='flex '>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer