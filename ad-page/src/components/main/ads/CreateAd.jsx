import axios from 'axios'
import React, { useState } from 'react'

const CreateAd = ({categories, setRefreshAds}) => {
    const [ newAd, setNewAd ] = useState({
        name:"",
        category:"",
        price:"",
        description:"",
        user:"",
        images:[],
        comments:[],
        likes:[],
    })
    const newAdCopy = {
        name:"",
        category:"",
        price:"",
        description:"",
        user:"",
        images:[],
        comments:[],
        likes:[],
    }
    const [imgOne, setImgOne] = useState("")
    const [imgTwo, setImgTwo] = useState("")
    const [imgThree, setImgThree] = useState("")
    const userToken = JSON.parse(localStorage.getItem("User")).token
    const [showForm, setShowForm] = useState(0)
    // console.log(userToken);

    const handleInput =(el)=>{
        const {name, value} = el.target
        setNewAd((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleSelect =(el)=>{
        const value = el.target.value
        setNewAd((prev)=>({
            ...prev,
            category:value
        }))
    }

    const submitForm = (ev) => {
        ev.preventDefault()
        if(imgOne!==""){newAd.images.push(imgOne)}
        if(imgTwo!==""){newAd.images.push(imgTwo)}
        if(imgThree!==""){newAd.images.push(imgThree)}
        if(newAd.images.length===0){newAd.images.push("https://archive.org/download/no-photo-available/no-photo-available.png")}
        axios
            .post(`http://localhost:4004/api/ads`, newAd, {    
                headers: { 
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                }}
            )
            .then((res)=>setRefreshAds([]))
            .catch((err)=>console.log(err))
        setNewAd(newAdCopy)
        setImgOne("")
        setImgTwo("")
        setImgThree("")
        setShowForm(0)
  
    }
  return (
    <div>
        <button onClick={()=>setShowForm(showForm===1?0:1)}>Create ad</button>
        {showForm===1?
            <form className='new_ad_create' onSubmit={submitForm}>
                <label htmlFor="new_ad_title">---Title---</label>
                <input id='new_ad_title' type="text" name="name" value={newAd.name} onChange={handleInput} required/>
                <label htmlFor='new_ad_category'>---Selesct category---</label>
                <select id="new_ad_category" value={newAd.category} onChange={handleSelect} required>
                    <option disabled name="default" value={""}>---Categories---</option>
                    {categories?.map((el)=><option key={el._id} name={el.name} value={el.name}>{el.name}</option>)}
                </select>
                <label htmlFor="new_ad_price">---Price---</label>
                <input id='new_ad_price' type="number"  name="price" value={newAd.price} onChange={handleInput} required/>
                <label htmlFor="new_ad_description">---Description---</label>
                <textarea name="description" id="new_ad_description" value={newAd.description} onChange={handleInput} required></textarea>
                <label htmlFor="new_ad_images">---Images---</label>
                <input type="text" name='images' value={imgOne} onChange={(el)=>setImgOne(el.target.value)} placeholder='url'/>
                <input type="text" name='images' value={imgTwo} onChange={(el)=>setImgTwo(el.target.value)} placeholder='url'/>
                <input type="text" name='images' value={imgThree} onChange={(el)=>setImgThree(el.target.value)} placeholder='url'/>
                <button>submit</button>
            </form>
        :null}
    </div>
  )
}

export default CreateAd