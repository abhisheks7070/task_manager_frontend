import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TaskList = (props) => {

  const tasks = [...props.user.tasks]
  
  
  
  const priorityOrder = { high: 3, medium: 2, low: 1 }
  
  tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
  
  const navigate = useNavigate()

  const handleView = async (event, e) => {
    event.stopPropagation()
    localStorage.setItem("task",e._id)
    navigate('/task')
    
  }


  const handleClick = async (event,e) => {
    event.stopPropagation()

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
    console.log(res.data.message)
    props.fetch()

  }


  return (
    <div className='text-white mt-5 bg-gray-800 pt-11 pb-2'>
      

      <div className='md:text-3xl sm:text-xl font-bold m-auto text-center text-black bg-emerald-300 w-fit rounded-full py-1 px-2 '>New Tasks</div>
      <div id='tasks' className='flex justify-start items-center flex-nowrap overflow-x-auto mt-5'>
        {tasks.map((e, i) => {
          if (e.new_task == true) {
            return (
              <div onClick={(event) => { handleView(event, e) }} key={i} className='p-5 m-5 bg-slate-300 min-h-[40vh] max-h-[50vh] h-auto w-[80vw] md:w-[35vw] rounded-2xl shrink-0 relative shadow-lg shadow-black pb-20 cursor-pointer'>
                <div className='descrption text-lg md:text-xl text-emerald-900 font-semibold mt-12'>
                  <span className='text-black font-bold text-xl md:text-2xl'>Title : </span>{e.title}
                </div>
                <div className='description text-lg md:text-xl text-emerald-900 font-semibold pt-3 truncate '>
                  <span className='text-black font-bold text-xl md:text-2xl truncate'>Description : </span>{e.description}
                </div>
                <div className='descrption text-lg md:text-xl text-emerald-900 font-semibold pt-3'>
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
                  className='cursor-pointer text-md md:text-xl font-semibold bg-green-500 absolute bottom-5 right-5 px-3 py-1 rounded-xl text-black border-4 border-green-800'
                  onClick={(event) => { handleClick(event,e) }}
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
