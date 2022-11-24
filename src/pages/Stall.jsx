import React from 'react'; 
import { Header, NavBar } from "../components"; 

const Stall = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Stall</div>
    </div>
  );
}

export default Stall