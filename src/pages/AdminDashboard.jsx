import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Taskscontext, Usercontext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import TaskNumbers from '../components/tasks/TaskNumbers';

const AdminDashboard = () => {
  // Single state object to manage form inputs

  const [user, setUser] = useState({})
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({
    employee: '',
    title: '',
    description: '',
    priority: 'high',
    category: ''
  });

  const navigate = useNavigate()

  useEffect(() => {
    handleFetch()

  }, [])

  const handleFetch = async () => {

    const token = localStorage.getItem("token")

    try {
      const res = await axios.get('https://task-manager-backend-red.vercel.app/api/auth/', {
        headers: {
          Authorization: token
        }
      })
      // console.log(res)
      setUser(res.data)
      setTasks(res.data.tasks)

    } catch (error) {
      alert("session expired")
      navigate("/")
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  // console.log([new Date().getDate(), new Date().getMonth(), new Date().getFullYear()].join("-"))
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a task object
    const newTask = {
      ...task,
      admin: user.email,
      date: [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()].join("-"),
      active: false,
      rejected: false,
      new_task: true,
      completed: false,
      submitted: false,
    };

    const token = localStorage.getItem("token")

    const res = await axios.post('https://task-manager-backend-red.vercel.app/api/Tasks/', newTask,
      {
        headers: { Authorization: token },
      }
    )

    console.log(res.data)
    res.status==201 && alert('Task created successfully!');


    // Reset form fields
    setTask({
      employee: '',
      title: '',
      description: '',
      priority: 'high',
      category: ''
    });
  };

  return (
    <Usercontext.Provider value={user}>
      <Taskscontext.Provider value={tasks}>
        <Navbar />
        <div className=" text-white items-center justify-between p-4 relative">

          <TaskNumbers />

          <div className="absolute top-1/3 right-[38vw] border-2 border-solid border-emerald-300 p-8 rounded-lg shadow-lg w-full max-w-md">
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
                  className="w-full px-4 py-2  border border-emerald-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-blue-500"
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
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Date Input */}
              {/* <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={task.date}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div> */}

              {/* Category Input */}
              <div className="mb-6">
                <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter task category"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-300 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Assign Task
              </button>
            </form>
          </div>
        </div>
      </Taskscontext.Provider>

    </Usercontext.Provider >
  );
};

export default AdminDashboard;
