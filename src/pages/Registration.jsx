import React from 'react';
import { Header, NavBar } from "../components"; 

const Registration = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Registration</div>
    </div>
  );
}

export default Registration