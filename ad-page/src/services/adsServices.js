import axios from "axios";

// data pvz.:
// data = {
//     name: "...",
//     surname: "...",
//     specialization: "...",
//     serviceName: "...",
//     img: "...",
//     city: "...",
// }

//GET Services
export const getServices = (setData) => {
  axios
    .get(`http://localhost:5000/api/ads`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.error(err));
};
//GET user Services
export const getUserServices = (setData, userToken) => {
  axios
    .get(`http://localhost:5000/api/ads/user`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.error(err));
};
//POST Service
export const createService = (data, userToken) => {
  axios
    .post(`http://localhost:5000/api/ads`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
//Update Service
export const updateService = (data, adId, userToken, setData) => {
  axios
    .put(`http://localhost:5000/api/ads/${adId}`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => getServices(setData))
    .catch((err) => console.error(err));
};
// Delete Service
export const deleteService = (adId, userToken) => {
  axios
    .delete(`http://localhost:5000/api/ads/${adId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => getServices(setData))
    .catch((err) => console.error(err));
};
