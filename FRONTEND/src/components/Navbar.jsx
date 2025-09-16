import { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

    const {user,setShowLogin, credit , logout} = useContext(AppContext)
    const navigate = useNavigate()
  return (
     <div className='flex items-center justify-between py-4 gap-5'>
        <img onClick={()=> navigate('/')} src={assets.logo} alt="" />

        <div>
            {user ?
            <div className='flex items-center gap-5'>
                <button onClick={()=> navigate('/buy')} className='flex items-center hover:scale-105 transition-all duration-700  gap-2 bg-blue-100 px-4 rounded-full py-1 '>
                    <img className='w-5' src={assets.credit_star} alt="" />
                    <p>credits left : {credit} </p>
                </button>
                <p>Hii , {user.name} </p>
                <div className='relative group'>

                   <img className='w-10 ' src={assets.profile_icon} alt="" />
                   <div className='absolute hidden group-hover:block left-0 top-0 right-0 z-10 text-black rounded pt-12  '>
                    <ul>
                        <li onClick={logout} >Logout</li>
                    </ul>

                </div>

                </div>
            </div>
            :
            <div className='flex gap-5 items-center justify-center '>
                <p onClick={()=> navigate('/buy')} className='cursor-pointer'>pricing</p>
                <button onClick={()=> setShowLogin(true)} className='bg-zinc-800 px-7 py-2 text-white rounded-full '>Login</button>
            </div>}
        </div>
     </div>
  )
}



export default Navbar