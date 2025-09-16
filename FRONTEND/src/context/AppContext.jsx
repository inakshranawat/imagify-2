import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'



export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [credit, setCredit] = useState(false)

    const navigate = useNavigate()

    const loadsCreditData = async ()=>{
        try {
            const {data} = await axios.get('http://localhost:4000/api/user/credits',{headers: {token}})
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)

            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post('http://localhost:4000/api/image/generate-image',{prompt},{headers: {token}})
            if(data.success){
                loadsCreditData()
                return data.resultImage
            }
            else{
                toast.error(error.message)
                loadsCreditData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }

            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)

    }
    useEffect(() => {
        if(token){

            loadsCreditData()
        }
    }, [token])
    

     
    const value = {
        user, setUser, showLogin, setShowLogin , generateImage  ,credit,setCredit, token, setToken , loadsCreditData, logout
    }
    return (
        <AppContext.Provider value={value} >
             {props.children}
            
        </AppContext.Provider>
    )
}
export default AppContextProvider