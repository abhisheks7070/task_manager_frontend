import React, { useContext, useEffect, useState } from 'react'
import { Taskscontext, Usercontext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TaskNumbers = () => {
    // const tasks = useContext(Taskscontext)
    // const user = useContext(Usercontext)

    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])

    const navigate = useNavigate()

    const [taskCount, setTaskCounts] = useState({ active: 0, completed: 0, new_task: 0, submitted: 0 });

    // Effect to calculate the counts when the component mounts
    const handleFetch = async () => {

        const token = localStorage.getItem("token")

        try {
            const res = await axios.get('https://task-manager-backend-red.vercel.app/api/auth/', {
                headers: {
                    Authorization: token, // Optional: Add authorization token
                },
            })

            // console.log(res.data)
            setUser(res.data)
            setTasks(res.data.tasks)

        } catch (error) {
            console.log("hjlhkjgjkgjgkg")
            alert("session expired")
            navigate("/")
        }
    }


    useEffect(() => {
        handleFetch()

        const counts = { active: 0, completed: 0, new_task: 0, submitted: 0 };

        tasks.forEach((task) => {
            if (task.active === true) counts.active++;
            else if (task.completed === true) counts.completed++;
            else if (task.new_task === true) counts.new_task++;
            else if (task.submitted === true) counts.submitted++;
        }, );


        setTaskCounts(counts);
    }, [tasks]); // Empty dependency array ensures this runs only once on mount





    return (
        <div className='text-white mt-10'>
            {
                <div className='flex justify-between items-center mx-5'>
                    {user.type == "employee" && <button onClick={() => { navigate("/active") }} className='flex flex-col justify-around items-center text-black font-extrabold py-10 gap-3 w-[22vw] bg-blue-400 rounded-xl text-5xl'><div>{taskCount.active}</div> <div>Active tasks</div> </button>}
                    <button onClick={() => { navigate("/completed") }} className='flex flex-col justify-around items-center text-black font-extrabold py-10 gap-3 w-[22vw] bg-green-400 rounded-xl text-5xl'><div>{taskCount.completed}</div> <div>Completed tasks</div> </button>
                    {user.type == "employee" && <button className='flex flex-col justify-around items-center text-black font-extrabold py-10 gap-3 w-[22vw] bg-yellow-400 rounded-xl text-5xl'><div>{taskCount.new_task}</div> <div>New tasks</div> </button>}
                    <button onClick={() => { navigate("/submitted") }} className='flex flex-col justify-around items-center text-black font-extrabold py-10 gap-3 w-[22vw] bg-red-400 rounded-xl text-5xl'><div>{taskCount.submitted}</div> <div>Submitted tasks</div> </button>
                    {/* <div>{taskCount.completed}</div>
                    <div>{taskCount.active}</div>
                    <div>{taskCount.failed}</div> */}
                </div >

            }
        </div>
    )
}

export default TaskNumbers
