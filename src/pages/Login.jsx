import axios from 'axios'
import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  let navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    // if(!/[!@#$%^&]/.test(form.password) || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/[0-9]/.test(form.password)){
    //   setError("password must contain uppercase,lowercase,special character and number")
    //   return
    // }

    // if((form.password).length < 8){
    //   setError("password must have atleast 8 character")
    //   return
    // }

    setError("")
    const res = await axios.post(import.meta.env.VITE_AUTH_URL + 'login', form)
    // const res = await axios.post(process.env.REACT_APP_URL + "api/auth", form)

    if (res.status == 200) {
      console.log(res.data.message)
      localStorage.setItem("token", res.data.token)

        res.data.type == "employee" && navigate('/e_dashboard')
        res.data.type == "admin" && navigate('/a_dashboard')
        res.data.type == "hr" && navigate('/hr_dashboard')
      }
    
  }


  const handleChange = (e) => {
    // console.log("submit")
    const name = e.target.name
    const value = e.target.value
    setForm({ ...form, [name]: value })
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen '>

        <form action="submit" onSubmit={handleSubmit} className='flex flex-col justify-center items-center border-2 rounded-xl border-emerald-300 p-8'>

          <input
            className='font-semibold border-2 border-emerald-300 p-2 rounded-3xl mt-8 text-white placeholder:text-gray-400'
            type="text"
            placeholder='Email'
            required
            onChange={handleChange}
            name='email'
            value={form.email} />

          <input
            className='font-semibold border-2 border-emerald-300 p-2 rounded-3xl mt-8 text-white placeholder:text-gray-400'
            type="password"
            placeholder='Password'
            required
            onChange={handleChange}
            name='password'
            value={form.password} />
          <div className='text-white'>{error}</div>
          <button className='border-2 font-semibold bg-emerald-300 px-3 py-1 rounded-2xl m-8 text-black placeholder:text-gray-400' type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login
