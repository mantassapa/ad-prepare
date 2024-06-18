import axios from 'axios';
import React, { useState } from 'react'
import UpdateAd from './UpdateAd';
import Ad from './Ad';

const Ads = ({ads, setRefreshAds, categories}) => {
  const user = JSON.parse(localStorage.getItem("User"))
  const [adU, setAdU] = useState([])
  const [showUpdate, setShowUpdate] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)

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
  return (
    <div className='allads'>
      {showUpdate===1?<UpdateAd adU={adU} user={user} setShowUpdate={setShowUpdate} setRefreshAds={setRefreshAds} categories={categories}/>:null}
      {ads.map((ad)=><Ad key={ad._id} ad={ad} user={user} setRefreshAds={setRefreshAds} setAdU={setAdU} setShowUpdate={setShowUpdate}/>)}
    </div>
  )
}

export default Ads