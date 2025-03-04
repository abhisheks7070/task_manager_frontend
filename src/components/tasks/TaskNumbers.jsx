import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TaskNumbers = (props) => {


    const [taskCount, setTaskCounts] = useState({ active: 0, completed: 0, new_task: 0, submitted: 0 });

    const navigate = useNavigate()
    const user = props.user
    const tasks = props.user.tasks


    useEffect(() => {

        const counts = { active: 0, completed: 0, new_task: 0, submitted: 0 };

        tasks.forEach((task) => {
            if (task.active === true) counts.active++;
            else if (task.completed === true) counts.completed++;
            else if (task.new_task === true) counts.new_task++;
            else if (task.submitted === true) counts.submitted++;
        },);
        setTaskCounts(counts)

    }, [])


    return (
        <div className='text-white mt-10'>
            <div className='flex flex-wrap justify-center gap-5 mx-5'>
                {user.type === "employee" && (
                    <button
                        onClick={() => navigate("/active")}
                        className='flex flex-col justify-around items-center text-black font-extrabold py-6 md:py-10 gap-3 w-[40vw] md:w-[22vw] bg-blue-400 rounded-xl text-xl md:text-3xl shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-500 cursor-pointer transition-all'
                    >
                        <div>{taskCount.active}</div>
                        <div>Active tasks</div>
                    </button>
                )}
                <button
                    onClick={() => navigate("/completed")}
                    className='flex flex-col justify-around items-center text-black font-extrabold py-6 md:py-10 gap-3 w-[40vw]  md:w-[22vw] bg-green-400 rounded-xl text-xl md:text-3xl shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-500 cursor-pointer transition-all'
                >
                    <div>{taskCount.completed}</div>
                    <div>Completed tasks</div>
                </button>
                {user.type === "employee" && (
                    <button
                        className='flex flex-col justify-around items-center text-black font-extrabold py-6 md:py-10 gap-3 w-[40vw] md:w-[22vw] bg-yellow-400 rounded-xl text-xl md:text-3xl shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-500 cursor-pointer transition-all'
                    >
                        <div>{taskCount.new_task}</div>
                        <div>New tasks</div>
                    </button>
                )}
                <button
                    onClick={() => navigate("/submitted")}
                    className='flex flex-col justify-around items-center text-black font-extrabold py-6 md:py-10 gap-3 w-[40vw] md:w-[22vw] bg-red-400 rounded-xl text-xl md:text-3xl shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-500 cursor-pointer transition-all'
                >
                    <div>{taskCount.submitted}</div>
                    <div>Submitted tasks</div>
                </button>
            </div>
        </div>
    )





}

export default TaskNumbers
