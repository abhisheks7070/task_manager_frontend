import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const TaskList = (props) => {

  const tasks = [...props.user.tasks]

  // console.log(tasks)



  const priorityOrder = { high: 3, medium: 2, low: 1 }

  tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])




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
      <div id='tasks' className='flex justify-start items-center flex-nowrap overflow-x-scroll'>
        {
          tasks.map((e, i) => {
            if (e.new_task == true) {

              return (

                <div key={i} className='p-5 m-5 bg-slate-300 min-h-[35vh] w-[35vw] rounded-2xl shrink-0 relative shadow-lg shadow-black inset-shadow-sm  inset-shadow-black'>
                  <div className='text-xl text-emerald-900 font-semibold mt-12'><span className='text-black font-bold text-2xl'>Title : </span>{e.title}</div>
                  <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Description : </span>{e.description}</div>
                  <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Date : </span>{e.date}</div>
                  <div className='text-xl text-emerald-900 font-semibold pt-3'><span className='text-black font-bold text-2xl'>Category : </span>{e.category}</div>
                  <div className='text-xl font-semibold bg-yellow-500 absolute top-5 right-5 px-3 py-1 rounded-xl text-black'>{e.date}</div>
                  <div className='text-xl font-semibold bg-red-500 absolute top-5 left-5 px-3 py-1 rounded-xl text-black'>{e.priority}</div>
                  {e.rejected == true && <div className='text-xl font-semibold text-red-500 absolute bottom-5 right-5 px-3 py-1 rounded-xl'>Rejected</div>}
                  <button className='cursor-pointer text-xl font-semibold bg-green-500 absolute bottom-5 left-[40%] px-3 py-1 rounded-xl text-black border-4 border-green-800' onClick={() => { handleClick(e) }}>Accept</button>

                </div>
              )
            }
          })
        }
      </div>
    </div>
  )



}

export default TaskList
