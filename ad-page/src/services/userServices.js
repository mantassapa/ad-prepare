import axios from "axios"
import { useState } from "react";


export const loginUser = (email, password, setData) => {
    axios
        .post(`http://localhost:5000/api/users/login`, {
            email,
            password,
        })
        .then((res)=>{
            localStorage.setItem("userData", JSON.stringify({token:res.data.token, username:res.data.username, _id:res.data._id})),
            setData(res.data)
            }
        )
        .catch((err)=>console.error(err))
}
export const registerUser = (username, email, password, setData) => {
    axios
        .post(`http://localhost:5000/api/users`, {
            username,
            email,
            password,
        })
        .then((res)=>{
            localStorage.setItem("userData", JSON.stringify({token:res.data.token, username:res.data.username, _id:res.data._id}));
            setData(res.data)
            }
        )
        .catch((err)=>console.error(err))
}

