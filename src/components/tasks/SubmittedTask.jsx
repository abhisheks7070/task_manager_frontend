import React, { useContext, useEffect, useState } from 'react'
import { Taskscontext, Usercontext } from '../../context/UserContext'
import axios from 'axios'
import Navbar from '../Navbar'

const SubmittedTask = () => {
    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        handleFetch()

    },[tasks])

    const token = localStorage.getItem("token")

    const handleFetch = async () => {


        try {
            // const token = localStorage.getItem("token")
            const res = await axios.get('https://task-manager-backend-red.vercel.app/api/auth/',
                {
                    headers: {
                        Authorization: token, // Optional: Add authorization token
                    },
                })
            setUser(res.data)
            setTasks(res.data.tasks)

        } catch (error) {
            alert("session expired")
            navigate("/")
        }
    }

    const priorityOrder = { high: 3, medium: 2, low: 1 }

    tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])




    // const res = await axios.put(`https://task-manager-backend-op6f6d86g.vercel.app/api/Tasks/${e._id}`, {

    const handleUnSubmit = async (e) => {
        // const token = localStorage.getItem("token")

        const res = await axios.put(`https://task-manager-backend-red.vercel.app/api/Tasks/${e._id}`, {
            active: true, submitted: false
        }, {
            headers: {
                Authorization: token,
            },
        });
    }
    const handleAccept = async (e) => {
        // const token = localStorage.getItem("token")

        const res = await axios.put(`https://task-manager-backend-red.vercel.app/api/Tasks/${e._id}`, {
            completed: true, submitted: false
        }, {
            headers: {
                Authorization: token,
            },
        });
    }
    const handleReject = async (e) => {
        // const token = localStorage.getItem("token")

        const res = await axios.put(`https://task-manager-backend-red.vercel.app/api/Tasks/${e._id}`, {
            new_task: true, submitted: false, rejected: true
        }, {
            headers: {
                Authorization: token,
            },
        });
    }


    return (
        <div className='relative'>
            <Usercontext.Provider value={user}>
                <Taskscontext.Provider value={tasks}>
                    <Navbar />
                    <div className='absolute top-15 right-[45vw] text-5xl font-bold text-center text-gray-500'>Submitted Tasks</div>
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
                                                {user.type == "admin" && <div className='text-xl text-emerald-900 font-semibold mt-3'><span className='text-black font-bold text-2xl'>Employee email : </span>{e.employee}</div>}
                                                <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Category : </span>{e.category}</div>
                                                <div className='text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>{e.date}</div>
                                                {/* <div className='text-xl font-semibold bg-red-500 absolute top-5 left-5 px-3 py-1 rounded-xl text-black'>{e.priority}</div> */}
                                                {user.type == "employee" ? <button className='text-xl font-semibold bg-red-500 absolute bottom-5 left-[40%] px-3 py-1 rounded-xl text-black' onClick={() => { handleUnSubmit(e) }}>Unsubmit</button> : <><button className='text-xl font-semibold bg-green-500 absolute bottom-5 right-[45%] px-3 py-1 rounded-xl text-black' onClick={() => { handleAccept(e) }}>Accept</button>
                                                    <button className='text-xl font-semibold bg-red-500 absolute bottom-5 left-[45%] px-3 py-1 rounded-xl text-black' onClick={() => { handleReject(e) }}>Reject</button></>}

                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </Taskscontext.Provider>

            </Usercontext.Provider>
        </div>
    )
}

export default SubmittedTask
