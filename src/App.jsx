import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminDashboard from './pages/AdminDashboard'
import HrDashboard from './pages/HrDashboard'
import ActiveTask from './components/tasks/ActiveTasks'
import CompletedTask from './components/tasks/CompletedTask'
import SubmittedTask from './components/tasks/SubmittedTask'

function App() {



  return (
    <>
      {/* {!user ? <Login handleLogin = {handleLogin} /> : ""}
  {user && user == "admin" ? <AdminDashboard /> : <EmployeeDashboard user={user}/>} */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route index element={<Login />} />
          <Route path="/e_dashboard" element={<EmployeeDashboard />} />
          <Route path="/a_dashboard" element={<AdminDashboard />} />
          <Route path="/hr_dashboard" element={<HrDashboard />} />
          <Route path="/active" element={<ActiveTask />} />
          <Route path="/completed" element={<CompletedTask />} />
          <Route path="/submitted" element={<SubmittedTask />} />
          {/* <Route path="*" element={<NoPage />} /> */}

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
