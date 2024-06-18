import axios from 'axios'
import React, { useState } from 'react'

const Ad = ({ad, user, setRefreshAds, setAdU, setShowUpdate}) => {
    
    const [imgIndex, setImgIndex] = useState(0)
    let imgCount = -1
    let likeCount = 0
    ad.images.forEach(()=>{
        imgCount+=1
    })
    ad.likes.forEach(()=>{
        likeCount+=1
    })

    const handleDelete =(adId)=>{
        axios
          .delete(`http://localhost:4004/api/ads/${adId}`,{    
            headers: { 
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            }}        
          )
          .then((res)=>setRefreshAds([]))
          .catch((err)=>console.log(err))
      }
    const handleLike =(adId)=>{
        axios
          .post(`http://localhost:4004/api/ads/${adId}/like`,{    
            headers: { 
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            }}        
          )
          .then((res)=>setRefreshAds([]))
          .catch((err)=>console.log(err))
      }
      console.log(ad);
  return (
    <div className='one_ad'>
        {user._id===ad.user._id||user.role==="admin"?<button onClick={()=>handleDelete(ad._id)}>delete</button>:null}
        {user._id===ad.user._id?<button onClick={()=>{setAdU(ad);setShowUpdate(1)}}>Update</button>:null}
        <h2>{ad.name}</h2>
        <div className='ad_img'>
            <button onClick={()=>handleLike}>&#9829;</button>
            <span>{likeCount}</span>
            <img src={ad.images[imgIndex]} alt="ad Image" style={{width:"200px", height:"120px"}}/>
            <button onClick={()=>setImgIndex(imgIndex===imgCount?0:imgIndex+1)}>&rarr;</button>
        </div>
        <h4>{ad.category.name}</h4>
        <h3 style={{color:"green"}}>{ad.price} €</h3>
        <p>{ad.description}</p>
        <h6>Created by {ad.user.username}</h6>
        <button>Comments</button>
    </div>
  )
}

export default Ad