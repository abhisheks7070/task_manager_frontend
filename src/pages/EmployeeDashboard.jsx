import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Taskscontext, Usercontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import TaskNumbers from '../components/tasks/TaskNumbers'
import TaskList from '../components/tasks/TaskList'

const EmployeeDashboard = () => {

  const [user, setUser] = useState({})
  const [tasks, setTasks] = useState([])
  // const [taskCount, setTaskCount] = useState({ "active": 0, "completed": 0, "failed": 0, "new_task": 0 })

  const navigate = useNavigate()

  useEffect(() => {
    handleFetch()

  },)

  const handleFetch = async () => {

    const token = localStorage.getItem("token")

    try {
      const res = await axios.get('https://task-manager-backend-op6f6d86g.vercel.app/api/auth/', {
        headers: {
          'Content-Type': 'application/json', // Optional: Set headers if needed
          'Authorization': token, // Optional: Add authorization token
        },
        withCredentials: true, // Optional: Include credentials (cookies) in the request
      })
      // console.log(res.data)
      setUser(res.data)
      setTasks(res.data.tasks)

    } catch (error) {
      alert("session expired")
      navigate("/")
    }
  }

  return (
    <>
      <Usercontext.Provider value={user}>
        <Taskscontext.Provider value={tasks}>


          <Navbar />
          <TaskNumbers />
          <div className='bg-gray-800 py-2 mt-5'>

            <div className='text-5xl font-bold m-auto text-center mt-5 text-black bg-emerald-300 w-[15vw] rounded-full py-2 '>New Tasks</div>
            <TaskList />
          </div>

          {/* <div className='text-white'>{user.user}</div> */}

          {/* {
        tasks.map((e,i) => {
          return (
            <div key={i}>
              <div className='text-white'>{e.title}</div>
              <div className='text-white'>{e.description}</div>
              <div className='text-white'>{e.category}</div>
            </div>
          )
        })
      }
      
              <div className='text-white'>{taskCount.new_task}</div> */}
          {/* <div className='text-white'>{e.description}</div> */}
          {/* <div className='text-white'>{e.category}</div> */}

        </Taskscontext.Provider>

      </Usercontext.Provider>
    </>
  )
}

export default EmployeeDashboard
