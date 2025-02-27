
import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AdminDashboard from './pages/AdminDashboard'
import HrDashboard from './pages/HrDashboard'
import ActiveTask from './components/tasks/ActiveTasks'
import CompletedTask from './components/tasks/CompletedTask'
import SubmittedTask from './components/tasks/SubmittedTask'
import Loading from './pages/Loading'

function App() {



  return (
    <>

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
          <Route path="/loading" element={<Loading />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
