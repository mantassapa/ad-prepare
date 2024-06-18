import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllUsers = ({user}) => {
    const [allUsers, setAllUsers] = useState([])
    const [error, setError] = useState("")
    const getUsers = () =>{
        axios
            .get(`http://localhost:4004/api/users`,
            {
                headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
                }
            })
            .then((res)=>setAllUsers(res.data))
            .catch((err)=>(console.log(err),setError(err.response.data.message)))
    }
    useEffect(()=>{
        getUsers()
    },[])

    const deleteUser = (id)=>{
        axios
            .delete(`http://localhost:4004/api/users/${id}`,{
            headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
            }})
            .then((res)=>(
                getUsers(),
                setError("")
            ))
            .catch((err)=>(console.log(err),setError(err.response.data.message))) 
    }

  return (
    <div className='users_edit'>
        <h4 style={{color:"red"}}>{error}</h4>
        <ul className='all_users'>
            {allUsers.map((el)=>el.role==="simple"?<li key={el._id} className='user'>
                <h4>ID: {el._id}</h4>
                <h4>Username: {el.username}</h4>
                <h4>Email: {el.email}</h4>
                <button onClick={()=>deleteUser(el._id)}>delete</button>
                </li>:null
            )}
        </ul>
    </div>
  )
}

export default AllUsers