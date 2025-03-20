import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../pages/Loading'
import Error from '../../pages/Error'
import { fetchUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const ActiveTask = () => {

    useEffect(() => {
        fetch()
    }, [])
    
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    
    
    const fetch = () => {
        
        dispatch(fetchUser())
    }
    
    const handleView = async (event, e) => {
        localStorage.setItem("task",e._id)
        navigate('/task')

    }
    
    const handleClick = async (event,e) => {
        event.stopPropagation()
        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            active: false, submitted: true
        },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
        console.log(res.data.message)

        fetch()
    }
    if (user.loading) {
        return <Loading />;
    }


    if (user.error) {
        return <Error />
    }


    if (user.data) {
        const tasks = [...user.data.tasks]
        const priorityOrder = { high: 3, medium: 2, low: 1 }

        tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        return (
            <div className='relative'>
                <Navbar user={user.data} />
                <div className='text-white mx-5 mt-10 py-5'>
                    <div id='tasks' className='flex flex-col justify-start items-center flex-nowrap overflow-x-scroll'>
                        <div className='z-3 fixed top-28 md:right-3 right-5 md:text-3xl text-xl font-bold text-center text-gray-500 '>Active Tasks</div>
                        {
                            tasks.map((e, i) => {
                                if (e.active == true) {

                                    return (

                                        <div onClick={(event)=>{handleView(event,e)}} key={i} className='p-5 mb-5 bg-slate-300 min-h-[35vh] w-full rounded-2xl shrink-0 relative pb-20 cursor-pointer'>
                                            <div className='text-xl text-emerald-900 font-semibold mt-12'><span className='text-black font-bold text-2xl'>Title : </span>{e.title}</div>
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Description : </span>{e.description}</div>
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Date : </span>{e.date}</div>
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Category : </span>{e.category}</div>
                                            <div className='text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>{e.date}</div>
                                            <div className='text-xl font-semibold bg-red-500 absolute top-5 left-5 px-3 py-1 rounded-xl text-black'>{e.priority}</div>
                                            {e.rejected == true && <div className='text-xl font-semibold text-red-500 absolute bottom-5 left-5 px-3 py-1 rounded-xl'>Rejected</div>}
                                            <button className='cursor-pointer text-md md:text-xl font-semibold bg-green-500 absolute bottom-5 right-5 px-4 py-2 rounded-xl text-white hover:bg-green-600 transition-colors ' onClick={(event) => { handleClick(event,e) }}>Submit</button>

                                        </div>
                                    )
                                }
                            })
                        }

                    </div>
                    {(tasks.filter((item)=>{
                        return item.active == true
                    })).length == 0 && <div className='text-white text-2xl md:text-6xl'>No tasks to show...</div>}
                </div>

            </div>
        )

    }




}

export default ActiveTask
