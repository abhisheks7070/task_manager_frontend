import React, {useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../features/user/userSlice';
import Error from './Error';
import Loading from './Loading';


const HrDashboard = () => {

    // State to manage form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('employee'); // Default to 'employee'
    const [designation, setDesignation] = useState('any'); // Default to 'employee'


    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
  
    const fetch = () => {
  
      dispatch(fetchUser())
    }

    useEffect(() => {
        fetch()

    }, [])

  

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a new user object
        const newUser = {
            name,
            email,
            password,
            type,
            designation,
        };
        const token = localStorage.getItem("token")

        const res =await axios.post(import.meta.env.VITE_AUTH_URL + 'register', newUser,
            {
                headers: { Authorization: token },
            }
        )
        console.log(res.data.message)
        res.status==201 && alert('User created successfully!');
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
        setType('employee');
        setDesignation('any');
    };


    if (user.loading) {
        return <Loading />;
      }
    
    
      if (user.error) {
        return <Error />
      }
    
    
      if (user.data) {
          return (
              <>
                  
      
                      <Navbar user={user.data} />
                      <div className=" text-white flex items-center justify-center p-4 mt-20">
                              <div className="border-2 border-emerald-300 p-8 rounded-lg shadow-lg w-full max-w-md">
                                  <h1 className="text-2xl font-bold mb-6 text-center">Create New User</h1>
                                  <form onSubmit={handleSubmit}>
                                      {/* Name Input */}
                                      <div className="mb-4">
                                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                                              Name
                                          </label>
                                          <input
                                              type="text"
                                              id="name"
                                              value={name}
                                              onChange={(e) => setName(e.target.value)}
                                              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                              placeholder="Enter name"
                                              required
                                          />
                                      </div>
      
                                      {/* Email Input */}
                                      <div className="mb-4">
                                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                                              Email
                                          </label>
                                          <input
                                              type="email"
                                              id="email"
                                              value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                              placeholder="Enter email"
                                              required
                                          />
                                      </div>
      
                                      {/* Password Input */}
                                      <div className="mb-4">
                                          <label htmlFor="password" className="block text-sm font-medium mb-2">
                                              Password
                                          </label>
                                          <input
                                              type="password"
                                              id="password"
                                              value={password}
                                              onChange={(e) => setPassword(e.target.value)}
                                              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                              placeholder="Enter password"
                                              required
                                          />
                                      </div>
      
                                      {/* User Type Dropdown */}
                                      <div className="mb-6">
                                          <label htmlFor="userType" className="block text-sm font-medium mb-2">
                                              Type
                                          </label>
                                          <select
                                              id="userType"
                                              value={type}
                                              onChange={(e) => setType(e.target.value)}
                                              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                              required
                                          >
                                              <option className='bg-black' value="employee">Employee</option>
                                              <option className='bg-black' value="admin">Admin</option>
                                              <option className='bg-black' value="hr">HR</option>
                                          </select>
                                      </div>
      
                                      {/* User Designation */}
                                      <div className="mb-4">
                                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                                              Designation
                                          </label>
                                          <input
                                              type="text"
                                              id="designation"
                                              value={designation}
                                              onChange={(e) => setDesignation(e.target.value)}
                                              className="w-full px-4 py-2 border border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
                                              placeholder="Enter Designation"
                                              required
                                          />
                                      </div>
                                      {/* Submit Button */}
                                      <button
                                          type="submit"
                                          className="w-full bg-emerald-300 text-black py-2 px-4 rounded-lg hover:bg-emerald-600 transition duration-300"
                                      >
                                          Create User
                                      </button>
                                  </form>
                              </div>
                          </div>
                      
              </>
          );

      }
};

export default HrDashboard;