import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import { fetchUser } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../pages/Loading'
import Error from '../../pages/Error'

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


    const handleUnSubmit = async (e) => {
        // const token = localStorage.getItem("token")

        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            active: true, submitted: false
        }, {
            headers: {
                Authorization: token,
            },
        });

        fetch()
    }

    const handleAccept = async (e) => {
        // const token = localStorage.getItem("token")

        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            completed: true, submitted: false
        }, {
            headers: {
                Authorization: token,
            },
        });
        fetch()
    }
    const handleReject = async (e) => {
        // const token = localStorage.getItem("token")

        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            new_task: true, submitted: false, rejected: true
        }, {
            headers: {
                Authorization: token,
            },
        });
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
                <div className='z-3 fixed top-15 right-[45vw] text-5xl font-bold text-center text-gray-500'>Submitted Tasks</div>
                <div className='text-white mx-5 mt-10 py-5'>
                    <div id='tasks' className='flex flex-col justify-start items-center flex-nowrap overflow-x-scroll'>
                        {
                            tasks.map((e, i) => {
                                if (e.submitted == true) {

                                    return (

                                        <div key={i} className='p-5 mb-5 bg-slate-300 min-h-[35vh] w-[96vw] rounded-2xl shrink-0 relative'>
                                            <div className='text-xl text-emerald-900 font-semibold mt-12'><span className='text-black font-bold text-2xl'>Title : </span>{e.title}</div>
                                            <div className='text-xl text-emerald-900 font-semibold mt-3'><span className='text-black font-bold text-2xl'>Description : </span>{e.description}</div>
                                            <div className='text-xl text-emerald-900 font-semibold mt-3'><span className='text-black font-bold text-2xl'>Date : </span>{e.date}</div>
                                            {user.data.type == "admin" && <div className='text-xl text-emerald-900 font-semibold mt-3'><span className='text-black font-bold text-2xl'>Employee email : </span>{e.employee}</div>}
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Category : </span>{e.category}</div>
                                            <div className='text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>{e.date}</div>
                                            {/* <div className='text-xl font-semibold bg-red-500 absolute top-5 left-5 px-3 py-1 rounded-xl text-black'>{e.priority}</div> */}
                                            {user.data.type == "employee" ? <button className='cursor-pointer text-xl font-semibold bg-red-500 absolute bottom-5 left-[40%] px-3 py-1 rounded-xl text-black border-4 border-red-800' onClick={() => { handleUnSubmit(e) }}>Unsubmit</button> : <><button className='cursor-pointer text-xl font-semibold bg-green-500 absolute bottom-5 right-[45%] px-3 py-1 rounded-xl text-black border-4 border-green-800' onClick={() => { handleAccept(e) }}>Accept</button>
                                                <button className='cursor-pointer text-xl font-semibold bg-red-500 absolute bottom-5 left-[45%] px-3 py-1 rounded-xl text-black border-4 border-red-800' onClick={() => { handleReject(e) }}>Reject</button></>}

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
