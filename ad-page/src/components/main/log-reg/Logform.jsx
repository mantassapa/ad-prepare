import axios from 'axios'
import React, { useState } from 'react'

const Logform = ({setShowReg, setUser}) => {
  const [error, setError] = useState("")
  const [regValue, setRegValue] = useState({
    name:"",
    email:"",
    pass:"",
  })
  const handleChange=(el)=>{
    const {name,value} = el.target
    setRegValue((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const login = (ev) => {
    ev.preventDefault()
    axios        
      .post("http://localhost:4004/api/users/login", {
      email:regValue.email,
      password:regValue.pass,
      })
      .then((res)=>(
        setError(""),
        localStorage.setItem("User", JSON.stringify(res.data)), 
        setShowReg(0), 
        setUser(res.data)
      ))
      .catch((err)=>(console.log(err),setError(err.response.data.message)))
  }

  return (
    <form onSubmit={login}>
      <h3 style={{color:"red"}}>{error}</h3>
      <h2 >Login</h2>
      <label htmlFor="reg_email">Email: </label>
      <input type="email" value={regValue.email} name='email' onChange={handleChange} required/>
      <label htmlFor="reg_pass_one">Passwrod: </label>
      <input type="password" value={regValue.pass} name='pass' onChange={handleChange} required/>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Logform