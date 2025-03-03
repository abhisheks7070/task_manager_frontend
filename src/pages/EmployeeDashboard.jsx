import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TaskNumbers from '../components/tasks/TaskNumbers'
import TaskList from '../components/tasks/TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'
import Loading from './Loading'
import Error from './Error'

const EmployeeDashboard = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const fetch = () => {

    dispatch(fetchUser())
  }

  useEffect(() => {

    fetch()
  }, [])

  if (user.loading) {
    return <Loading />;
  }

  if (user.error) {
    console.log(user.error)
    return <Error errorMessage={user.error} />
  }


  if (user.data) {

    return (
      <>

        <Navbar user={user.data} />
        <TaskNumbers user={user.data} fetch={fetch} />
        <div className='bg-gray-800 py-2 mt-5'>

          <div className='md:text-3xl sm:text-xl font-bold m-auto text-center mt-5 text-black bg-emerald-300 w-fit rounded-full py-1 px-2 '>New Tasks</div>
          <TaskList user={user.data} fetch={fetch} />
        </div>
      </>
    )
  }


}

export default EmployeeDashboard
