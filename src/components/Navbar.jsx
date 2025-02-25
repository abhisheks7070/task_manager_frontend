import React, { useContext } from 'react'
import { Usercontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const user = useContext(Usercontext)
    const handleLogout = ()=>{
        localStorage.setItem("token", "")
        navigate("/")
    }
    const handleClick = ()=>{

        user.type == "employee" && navigate('/e_dashboard') 
        user.type == "admin" && navigate('/a_dashboard') 
        user.type == "hr" && navigate('/hr_dashboard') 
    }
    return (<>
        <div className='sticky top-0 right-0 z-2  p-10 bg-[#1c1c1c] text-white flex justify-between items-start'>
            <div className='text-white flex flex-col'>

                <div className='text-3xl font-medium'>
                    Hello
                </div>
                <button onClick={handleClick} className='text-5xl font-semibold'>

                {user.name}👋
                </button>
            </div>
            <button className='bg-red-700 px-4 py-2 rounded-lg text-2xl font-bold' onClick={handleLogout}>Logout</button>
        </div>
    </>
    )
}

export default Navbar
