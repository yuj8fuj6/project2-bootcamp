import React from 'react'; 
import { Header, NavBar } from "../components"; 

const Landing = () => {
  return (
    <div className="flex justify-around flex-wrap w-screen p-4">
      <Header />
      <NavBar />
    </div>
  )
}

export default Landing