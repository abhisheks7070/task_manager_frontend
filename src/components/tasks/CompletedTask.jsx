import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Error from '../../pages/Error'
import Loading from '../../pages/Loading'
import { fetchUser } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompletedTask = () => {
    useEffect(() => {
        fetch()
    }, [])


    // const priorityOrder = { high: 3, medium: 2, low: 1 }

    // tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])


    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)


    const navigate = useNavigate()

    const handleView = async (event, e) => {
        event.stopPropagation()
        localStorage.setItem("task", e._id)
        navigate('/task')

    }

    const fetch = () => {

        dispatch(fetchUser())
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
                <div className='z-3 fixed top-28 md:right-3 right-5 md:text-3xl text-xl font-bold text-center text-gray-500 '>Completed Tasks</div>
                <div className='text-white mx-5 mt-10 py-5'>
                    <div id='tasks' className='flex flex-col justify-start items-center flex-nowrap overflow-x-scroll'>
                        {
                            tasks.map((e, i) => {
                                if (e.completed == true) {
                                    return (
                                        <div onClick={(event) => { handleView(event, e) }} key={i} className='p-5 mb-5 bg-slate-300 min-h-[35vh] w-full rounded-2xl shrink-0 relative py-15 cursor-pointer'>

                                            {user.data.type == "admin" && (
                                                <div className='text-xl text-emerald-900 font-semibold '>
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
                                            <div className='text-xl font-semibold bg-green-500 absolute bottom-5 right-5 px-3 py-1 rounded-xl text-black'>completed</div>
                                            {/* <button className='text-xl md:text-2xl lg:text-3xl font-semibold bg-green-500 absolute bottom-5 left-[40%] px-3 py-1 rounded-xl text-black' onClick={() => { handleClick(e) }}>Submit</button> */}
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

export default CompletedTask
