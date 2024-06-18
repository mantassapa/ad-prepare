import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import axios from 'axios';
import Categories from './components/admin/Categories';
import AllUsers from './components/admin/AllUsers';


function App() {
  const [showReg, setShowReg] = useState(0)
  const [showFilters, setShowFilters] = useState("")
  const [user, setUser] = useState(localStorage.getItem("User")===null?"none":JSON.parse(localStorage.getItem("User")))
  const [categories, setCategories] = useState([])
  const [allUsers, setAllUsers] = useState([])
  
  const getCategories = ()=>{
      axios
        .get("http://localhost:4004/api/categories")
        .then((res)=>setCategories(res.data))
        .catch((err)=>console.log(err))
  }
  
  useEffect(()=>{
    getCategories()
    if(user!="none"){setShowReg(0)}
  },[])
  
  return (
    <div className="App"> 
      <Header 
        showReg={showReg}
        user={user}
        setUser={setUser}
        setShowReg={setShowReg}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
      />
      <hr />
      {showFilters===1?<Categories 
        user={user} 
        categories={categories}
        getCategories={getCategories}
      />:null}
      {showFilters===2?<AllUsers
        user={user} 
      />:null}
      <Main 
        showReg={showReg}
        setShowReg={setShowReg}
        setUser={setUser}
        categories={categories}
      />
      
    </div>
  );
}

export default App;
