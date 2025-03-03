import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { fetchUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import Error from './Error'
import { getTask } from '../features/user/taskSlice'

const Task = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const task = useSelector((state) => state.task)

    const fetch = () => {
        dispatch(fetchUser())
        dispatch(getTask(JSON.parse(localStorage.getItem("task"))))
    }

    useEffect(() => {

        fetch()
    }, [])

    const handleAccept = async (e) => {
        const token = localStorage.getItem("token")

        const res = await axios.put(`https://task-manager-backend-red.vercel.app/api/Tasks/${e._id}`, {
            active: true, new_task: false
        },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        console.log(res.data)

        fetch()
    }

    const handleSubmit = async (e) => {
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

    const handleApprove = async (e) => {
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
        console.log(user.error)
        return <Error errorMessage={user.error} />
    }


    if (user.data && task) {
        return (
            <div className='relative'>
                <Navbar user={user.data} />

                <div className='z-3 fixed top-28 md:right-3 right-5 md:text-3xl text-xl font-bold text-center text-gray-500 '>Task Detail</div>

                <div className="p-5 bg-white rounded-lg shadow-md relative">
                    {/* Task Details */}
                    <div className="space-y-3 pb-20">
                        <div className="text-xl font-bold text-gray-800">
                            <span className="text-gray-600">Task_id:</span> {task._id}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="text-gray-600 font-bold text-xl">Title:</span> {task.title}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="text-gray-600 font-bold text-xl">Description:</span> {task.description}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="text-gray-600 font-bold text-xl">Category:</span> {task.category}
                        </div>
                        <div className="text-lg text-gray-700">
                            <span className="text-gray-600 font-bold text-xl">Priority:</span> {task.priority}
                        </div>
                    </div>

                    {/* Rejected Status */}
                    {task.rejected && (
                        <div className="text-md font-semibold text-red-500 absolute bottom-5 right-5 px-3 py-1 rounded-xl">
                            Rejected
                        </div>
                    )}

                    {/* New Task Button */}
                    {task.new_task && (
                        <button
                            className="cursor-pointer text-md md:text-xl font-semibold bg-green-500 absolute bottom-5 left-5 px-4 py-2 rounded-xl text-white hover:bg-green-600 transition-colors"
                            onClick={() => handleAccept(task._id)}
                        >
                            Accept
                        </button>
                    )}

                    {/* Active Task Button */}
                    {task.active && (
                        <button
                            className="cursor-pointer text-md md:text-xl font-semibold bg-blue-500 absolute bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl text-white hover:bg-blue-600 transition-colors"
                            onClick={() => handleSubmit(task._id)}
                        >
                            Submit
                        </button>
                    )}

                    {/* Employee Unsubmit Button */}
                    {user.data.type === "employee" && task.submitted && (
                        <button
                            className="cursor-pointer text-md md:text-xl font-semibold bg-red-500 absolute bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl text-white hover:bg-red-600 transition-colors"
                            onClick={() => handleUnSubmit(task._id)}
                        >
                            Unsubmit
                        </button>
                    )}

                    {/* Admin Buttons */}
                    {user.data.type === "admin" && task.submitted && (
                        <div className="flex space-x-4 absolute bottom-5 right-5">
                            <button
                                className="cursor-pointer text-md md:text-xl font-semibold bg-green-500 px-4 py-2 rounded-xl text-white hover:bg-green-600 transition-colors"
                                onClick={() => handleApprove(task._id)}
                            >
                                Approve
                            </button>
                            <button
                                className="cursor-pointer text-md md:text-xl font-semibold bg-red-500 px-4 py-2 rounded-xl text-white hover:bg-red-600 transition-colors"
                                onClick={() => handleReject(task._id)}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )

    }
}
export default Task
