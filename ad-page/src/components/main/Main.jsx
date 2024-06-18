import React, { useEffect, useState } from 'react'
import Regform from './log-reg/Regform'
import Logform from './log-reg/Logform'
import axios from 'axios'
import Ads from './ads/Ads'
import CreateAd from './ads/CreateAd'
import Search from './filters/Search'

const Main = ({showReg, setShowReg, setUser, categories}) => {

    const [ads, setAds] = useState([])
    const [refreshAds, setRefreshAds] = useState([])

    useEffect(()=>{
        axios
            .get("http://localhost:4004/api/ads")
            .then((res)=>setAds(res.data))
    },[refreshAds])

  return (
    <main>
        {showReg===1?<Regform setShowReg={setShowReg} setUser={setUser}/>:null}
        {showReg===2?<Logform setShowReg={setShowReg} setUser={setUser}/>:null}
        <Search/>
        <CreateAd categories={categories} setRefreshAds={setRefreshAds}/>
        <Ads ads={ads} setRefreshAds={setRefreshAds} categories={categories}/>

    </main>
  )
}

export default Main