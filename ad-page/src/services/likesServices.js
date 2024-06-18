import axios from "axios";
import { getServices } from "../ads/adsServices";

// data pvz.:
// data = {
//     value: "..", 
//     ad: "ad_id"
// }

// Post Likes
export const createLike = (data, userToken, setData) => {
    axios
        .post(`http://localhost:5000/api/likes`, data, {
            headers:{
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then((res)=>getServices(setData))
        .catch((err)=>console.error(err))
}

// Update Like

export const updateLike = (data, userToken, likeId, setData)=>{
    axios
    .put(`http://localhost:5000/api/likes/${likeId}`, data, {
    headers:{
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    }
    })
    .then((res)=>getServices(setData))
    .catch((err)=>console.error(err))
}