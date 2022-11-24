import React from 'react'; 
import { Header, NavBar } from "../components"; 

const Dish = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Dish</div>
    </div>
  );
}

export default Dish