import React, { useState } from 'react'

const Header = ({
    showReg, 
    setShowReg, 
    user, 
    setUser,
    setShowFilters,
    showFilters,
    }) => {
  return (  
    <header>
        {user.username?<h3>Welcome: {user.username}</h3>:null}
        {user==="none"?<button onClick={()=>setShowReg(2)}>Login</button>:null}
        {user==="none"?<button onClick={()=>setShowReg(1)}>Register</button>:null}
        {user!=="none"?<button onClick={()=>(localStorage.removeItem("User"),setUser("none"))}>Log out</button>:null}
        {user.role==="admin"?<button onClick={()=>setShowFilters(showFilters===1?0:1)}>Edit Categories</button>:null}
        {user.role==="admin"?<button onClick={()=>setShowFilters(showFilters===2?0:2)}>Edit Users</button>:null}
    </header>
  )
}

export default Header