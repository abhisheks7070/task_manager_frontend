import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../pages/Loading'
import Error from '../../pages/Error'
import { fetchUser } from '../../features/user/userSlice'

const ActiveTask = () => {

    useEffect(() => {
        fetch()
    }, [])




    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)


    const fetch = () => {

        dispatch(fetchUser())
    }

    const handleClick = async (e) => {
        const res = await axios.put(import.meta.env.VITE_TASKS_URL + e._id, {
            active: false, submitted: true, rejected: false
        },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
        console.log(res.data)

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

                                        <div key={i} className='p-5 mb-5 bg-slate-300 min-h-[35vh] w-full md:w-[80vw] lg:w-[60vw] xl:w-[50vw] rounded-2xl shrink-0 relative pb-20'>
                                            <div className='text-xl text-emerald-900 font-semibold mt-12'><span className='text-black font-bold text-2xl'>Title : </span>{e.title}</div>
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Description : </span>{e.description}</div>
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Date : </span>{e.date}</div>
                                            <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Category : </span>{e.category}</div>
                                            <div className='text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>{e.date}</div>
                                            <div className='text-xl font-semibold bg-red-500 absolute top-5 left-5 px-3 py-1 rounded-xl text-black'>{e.priority}</div>
                                            <button className='cursor-pointer text-xl font-semibold bg-green-500 absolute bottom-5 left-[40%] px-3 py-1 rounded-xl text-black border-4 border-green-800 ' onClick={() => { handleClick(e) }}>Submit</button>

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

export default ActiveTask
