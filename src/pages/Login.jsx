import React from 'react'; 
import { Header, NavBar } from "../components"; 

const Login = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Login</div>
    </div>
  );
}

export default Login