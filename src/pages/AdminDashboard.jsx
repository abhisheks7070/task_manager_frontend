import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loading from './Loading'
import TaskNumbers from '../components/tasks/TaskNumbers';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';

const AdminDashboard = () => {

  const [task, setTask] = useState({
    employee: '',
    title: '',
    description: '',
    priority: 'high',
    category: ''
  });

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const fetch = () => {

    dispatch(fetchUser())
  }

  useEffect(() => {

    fetch()
  }, [])



  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a task object
    const newTask = {
      ...task,
      admin: user.data.email,
      date: [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()].join("-"),
      active: false,
      rejected: false,
      new_task: true,
      completed: false,
      submitted: false,
    };

    const token = localStorage.getItem("token")

    const res = await axios.post(import.meta.env.VITE_TASKS_URL, newTask,
      {
        headers: { Authorization: token },
      }
    )

    console.log(res.data.message)
    res.status == 201 && alert('Task created successfully!');


    // Reset form fields
    setTask({
      employee: '',
      title: '',
      description: '',
      priority: 'high',
      category: ''
    });
  };




  if (user.loading) {
    return <Loading />;
  }


  if (user.error) {
    return <Error />
  }


  if (user.data) {
// console.log(user.data)
    return (
      <>
        <Navbar user={user.data} />
        <div className=" text-white items-center justify-between">

          <TaskNumbers user={user.data} fetch={fetch} />

          <div className="border-2 border-solid border-emerald-300 p-8 rounded-lg shadow-lg w-[85vw] max-w-md m-auto mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Assign Task to Employee</h1>
            <form onSubmit={handleSubmit}>
              {/* Employee email */}
              <div className="mb-4">
                <label htmlFor="employee" className="block text-sm font-medium mb-2">Employee email</label>
                <input
                  type="email"
                  id="employee"
                  name="employee"
                  value={task.employee}
                  onChange={handleChange}
                  className="w-full px-4 py-2  border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Enter Employee email"
                  required
                />
              </div>
              {/* Title Input */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Enter task description"
                  rows="4"
                  required
                />
              </div>

              {/* Priority Dropdown */}
              <div className="mb-4">
                <label htmlFor="priority" className="block text-sm font-medium mb-2">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                  required
                >
                  <option className='text-black' value="low">Low</option>
                  <option className='text-black' value="medium">Medium</option>
                  <option className='text-black' value="high">High</option>
                </select>
              </div>

              {/* Category Input */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-blueemerald"
                  placeholder="Enter task category"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-300 text-black py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
              >
                Assign Task
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

};

export default AdminDashboard;
