import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UpdateAd = ({adU, user, setShowUpdate, setRefreshAds, categories}) => {

    const [ newAd, setNewAd ] = useState(adU)
    const [imgOne, setImgOne] = useState("")
    const [imgTwo, setImgTwo] = useState("")
    const [imgThree, setImgThree] = useState("")
    useEffect(()=>{
        setNewAd(adU)
        setImgOne(adU.images[0]==="https://archive.org/download/no-photo-available/no-photo-available.png"?"":adU.images[0])
        setImgTwo(adU.images[1]===undefined?"":adU.images[1])
        setImgThree(adU.images[2]===undefined?"":adU.images[2])
    },[adU])



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
    console.log(adU);
    console.log(newAd);

    const updateForm = (ev) => {
        ev.preventDefault()
        imgThree===""?newAd.images.splice(2,1):newAd.images[2]=imgThree
        imgTwo===""?newAd.images.splice(1,1):newAd.images[1]=imgTwo
        imgOne===""?newAd.images.splice(0,1):newAd.images[0]=imgOne
        if(newAd.images.length===0){newAd.images.push("https://archive.org/download/no-photo-available/no-photo-available.png")}
        axios
            .put(`http://localhost:4004/api/ads/${adU._id}`, newAd, {    
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                }}
            )
            .then((res)=>setRefreshAds([]))
            .catch((err)=>console.log(err))
        setImgOne("")
        setImgTwo("")
        setImgThree("")
        setShowUpdate(0)
    }

  return (
    <div className='UpdateAd'>
        <h3>Update ad: {adU.name}</h3>
        <button onClick={()=>setShowUpdate(0)}>Cancel</button>
        <form className='ad_create' onSubmit={updateForm}>
                <label htmlFor="ad_title">---Title---</label>
                <input id='ad_title' type="text" name="name" value={newAd.name} onChange={handleInput} required/>
                <label htmlFor='ad_category'>---Selesct category---</label>
                <select id="ad_category" value={newAd.category} onChange={handleSelect} required>
                    <option disabled name="default" value={""}>---Categories---</option>
                    {categories?.map((el)=><option key={el._id} name={el.name} value={el.name}>{el.name}</option>)}
                </select>
                <label htmlFor="ad_price">---Price---</label>
                <input id='ad_price' type="number"  name="price" value={newAd.price} onChange={handleInput} required/>
                <label htmlFor="ad_description">---Description---</label>
                <textarea name="description" id="ad_description" value={newAd.description} onChange={handleInput} required></textarea>
                <label htmlFor="ad_images">---Images---</label>
                <input type="text" name='images' value={imgOne} onChange={(el)=>setImgOne(el.target.value)} placeholder='url'/>
                <input type="text" name='images' value={imgTwo} onChange={(el)=>setImgTwo(el.target.value)} placeholder='url'/>
                <input type="text" name='images' value={imgThree} onChange={(el)=>setImgThree(el.target.value)} placeholder='url'/>
                <button>Update</button>
            </form>
    </div>
  )
}

export default UpdateAd