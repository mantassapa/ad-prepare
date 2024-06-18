import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Categories = ({user,categories, getCategories}) => {
    const [filters, setFilters] = useState([])
    const [category, setCategory] = useState("")
    const [error, setError] = useState("")

    const addCategory =(e)=>{
        e.preventDefault()
        axios
            .post("http://localhost:4004/api/categories", {name: category},{
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            }})
            .then((res)=>(
                getCategories(),
                setCategory(""),
                setError("")
            ))
            .catch((err)=>(console.log(err),setError(err.response.data.message)))

    }
    const handleCatChange = (el) => {
        setCategory(el.target.value)
    }
    const deleteCategory = (id)=>{
        axios
            .delete(`http://localhost:4004/api/categories/${id}`,{
            headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
            }})
            .then((res)=>(
                getCategories(),
                setCategory(""),
                setError("")
            ))
            .catch((err)=>(console.log(err),setError(err.response.data.message))) 
    }

  return (
    <div className='categories_edit'>
        <ul>
            {categories?.map((el)=><li key={el._id}>
            <h4>{el.name} <span><button onClick={()=>deleteCategory(el._id)}>X</button></span></h4> 
            
            </li>)}
        </ul>
        <form onSubmit={addCategory}>
            <h4 style={{color:"red"}}>{error}</h4>
            <input type="text" value={category} onChange={handleCatChange} placeholder='Add new Category' required/>
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Categories