import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import { fetchUser } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../pages/Loading'
import Error from '../../pages/Error'
import { useNavigate } from 'react-router-dom'


const SubmittedTask = () => {

    const token = localStorage.getItem("token")


    useEffect(() => {
        fetch()
    }, [])



    // const priorityOrder = { high: 3, medium: 2, low: 1 }

    // tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])


    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)


    const fetch = () => {

        dispatch(fetchUser())
    }
    const navigate = useNavigate()

    const handleView = async (event, e) => {
        localStorage.setItem("task", e._id)
        navigate('/task')

    }


    const handleUnSubmit = async (event, e) => {
        // const token = localStorage.getItem("token")
        event.stopPropagation()

        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            active: true, submitted: false
        }, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data.message)
        fetch()
    }
    
    const handleAccept = async (event, e) => {
        // const token = localStorage.getItem("token")
        event.stopPropagation()
        
        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            completed: true, submitted: false
        }, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data.message)
        fetch()
    }
    const handleReject = async (event, e) => {
        // const token = localStorage.getItem("token")
        event.stopPropagation()
        
        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            new_task: true, submitted: false, rejected: true
        }, {
            headers: {
                Authorization: token,
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
        const tasks = user.data.tasks
        return (
            <div className='relative'>

                <Navbar user={user.data} />
                <div className='z-3 fixed top-28 md:right-3 right-5 md:text-3xl text-xl font-bold text-center text-gray-500 '>Submitted Tasks</div>
                <div className='text-white mx-5 mt-10 py-5'>
                    <div id='tasks' className='flex flex-col justify-start items-center flex-nowrap overflow-x-scroll'>
                        {
                            tasks.map((e, i) => {
                                if (e.submitted == true) {
                                    return (
                                        <div onClick={(event) => { handleView(event, e) }} key={i} className='p-5 mb-5 bg-slate-300 min-h-[35vh] w-full rounded-2xl shrink-0 relative pb-20 cursor-pointer'>
                                            {user.data.type == "admin" && (
                                                <div className='text-xl text-emerald-900 font-semibold mt-15'>
                                                    <span className='text-black font-bold text-2xl'>Employee email : </span>{e.employee}
                                                </div>
                                            )}
                                            <div className='text-xl text-emerald-900 font-semibold mt-3'>
                                                <span className='text-black font-bold text-2xl'>Title : </span>{e.title}
                                            </div>
                                            <div className='text-xl text-emerald-900 font-semibold mt-3'>
                                                <span className='text-black font-bold text-2xl'>Category : </span>{e.category}
                                            </div>
                                            <div className='text-xl text-emerald-900 font-semibold mt-3'>
                                                <span className='text-black font-bold text-2xl'>Description : </span>{e.description}
                                            </div>
                                            <div className='text-xl text-emerald-900 font-semibold mt-3'>
                                                <span className='text-black font-bold text-2xl'>Date : </span>{e.date}
                                            </div>
                                            <div className='text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>
                                                {e.date}
                                            </div>
                                            {user.data.type == "employee" ? (
                                                <button className='cursor-pointer text-xl font-semibold bg-red-500 absolute bottom-5 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-xl text-black border-4 border-red-800' onClick={(event) => { handleUnSubmit(event, e) }}>
                                                    Unsubmit
                                                </button>
                                            ) : (
                                                <div className="flex space-x-4 absolute bottom-5 right-5">
                                                    <button className='cursor-pointer text-xl font-semibold bg-green-500 px-3 py-1 rounded-xl text-black border-4 border-green-800' onClick={(event) => { handleAccept(event, e) }}>
                                                        Accept
                                                    </button>
                                                    <button className='cursor-pointer text-xl font-semibold bg-red-500 px-3 py-1 rounded-xl text-black border-4 border-red-800' onClick={(event) => { handleReject(event, e) }}>
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }

}

export default SubmittedTask
