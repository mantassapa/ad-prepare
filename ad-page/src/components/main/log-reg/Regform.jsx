import React, { useState } from 'react'
import axios from "axios"

const Regform = ({setShowReg, setUser}) => {
  const [error, setError] = useState("")
  const [regValue, setRegValue] = useState({
    name:"",
    email:"",
    pass:"",
    pass2:"",
  })

  const handleChange=(el)=>{
      const {name,value} = el.target
      setRegValue((prev)=>({
        ...prev,
        [name]:value
      }))
  }

  const register = (ev) => {
    ev.preventDefault()
    if(regValue.pass===regValue.pass2){
      setError("")
        axios
        .post("http://localhost:4004/api/users", {
        username:regValue.name,
        email:regValue.email,
        password:regValue.pass,
        })
        .then((res)=>(
          console.log(res.data),
          setError(""),
          localStorage.setItem("User", JSON.stringify(res.data)),
          setShowReg(0),
          setUser(res.data)
        ))
        .catch((err)=>(console.log(err),setError(err.response.data.message)))
    }else{setError("Passwords don't match")}
  }

  return (
    <form onSubmit={register}>
      <h3 style={{color:"red"}}>{error}</h3>
      <h2 >Register</h2>
        <label htmlFor="reg_name">Name: </label>
        <input type="text" value={regValue.name} name='name' onChange={handleChange} required/>
        <label htmlFor="reg_email">Email: </label>
        <input type="email" value={regValue.email} name='email' onChange={handleChange} required/>
        <label htmlFor="reg_pass_one">Passwrod: </label>
        <input type="password" value={regValue.pass} name='pass' onChange={handleChange} required/>
        <label htmlFor="reg_pass_2">Repeat password: </label>
        <input type="password" value={regValue.pass2} name='pass2' onChange={handleChange} required/>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default Regform