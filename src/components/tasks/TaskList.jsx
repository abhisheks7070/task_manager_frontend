import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTask } from '../../features/user/taskSlice'

const TaskList = (props) => {

  const tasks = [...props.user.tasks]
  
  
  
  const priorityOrder = { high: 3, medium: 2, low: 1 }
  
  tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
  
  const navigate = useNavigate()

  const handleView = async (event, e) => {
    event.stopPropagation()
    localStorage.setItem("task",JSON.stringify(e))
    navigate('/task')
    
  }


  const handleClick = async (e) => {

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
    props.fetch()

  }


  return (
    <div className='text-white mx-5 mt-5'>
      <div id='tasks' className='flex justify-start items-center flex-nowrap overflow-x-auto'>
        {tasks.map((e, i) => {
          if (e.new_task == true) {
            return (
              <div onClick={(event) => { handleView(event, e) }} key={i} className='p-5 m-5 bg-slate-300 h-[35vh] w-[80vw] md:w-[35vw] rounded-2xl shrink-0 relative shadow-lg shadow-black pb-20 cursor-pointer'>
                <div className='text-lg md:text-xl text-emerald-900 font-semibold mt-12'>
                  <span className='text-black font-bold text-xl md:text-2xl'>Title : </span>{e.title}
                </div>
                <div className='description text-lg md:text-xl text-emerald-900 font-semibold pt-3 truncate '>
                  <span className='text-black font-bold text-xl md:text-2xl truncate'>Description : </span>{e.description}
                </div>
                <div className='text-lg md:text-xl text-emerald-900 font-semibold pt-3'>
                  <span className='text-black font-bold text-xl md:text-2xl'>Category : </span>{e.category}
                </div>
                <div className='text-lg md:text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>
                  {e.date}
                </div>
                <div className='text-lg md:text-xl font-semibold bg-red-500 absolute top-5 left-5 px-3 py-1 rounded-xl text-black'>
                  {e.priority}
                </div>
                {e.rejected == true && (
                  <div className='text-md font-semibold text-red-500 absolute bottom-5 md:right-5 right-1 px-3 py-1 rounded-xl'>
                    Rejected
                  </div>
                )}
                <button
                  className='cursor-pointer text-md md:text-xl font-semibold bg-green-500 absolute bottom-5 left-5 px-3 py-1 rounded-xl text-black border-4 border-green-800'
                  onClick={() => { handleClick(e) }}
                >
                  Accept
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  )



}

export default TaskList
