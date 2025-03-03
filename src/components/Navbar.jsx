import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const navigate = useNavigate()  
    const user = props.user

    const handleLogout = () => {
        localStorage.setItem("token", "")
        localStorage.setItem("task","")

        navigate("/")
        console.log("logged out")
    }
    const handleClick = () => {

        props.user.type == "employee" && navigate('/e_dashboard')
        props.user.type == "admin" && navigate('/a_dashboard')
        props.user.type == "hr" && navigate('/hr_dashboard')
    }


    return (<>
      <div className='sticky top-0 right-0 z-2 p-4 md:p-10 bg-[#1c1c1c] text-white flex flex-col md:flex-row justify-between items-start shadow-lg shadow-emerald-400 inset-shadow-sm inset-shadow-indigo-500'>
    <div className='text-white flex flex-col'>
        <div className='text-2xl md:text-3xl font-medium'>
            Hello
        </div>
        <button onClick={handleClick} className='cursor-pointer text-4xl md:text-5xl font-semibold'>
            {user.name}👋
        </button>
    </div>
    <button className='cursor-pointer bg-red-700 px-4 py-2 rounded-lg text-xl md:text-2xl font-bold mt-4 md:mt-0' onClick={handleLogout}>
        Logout
    </button>
</div>
    </>
    )
}

export default Navbar
