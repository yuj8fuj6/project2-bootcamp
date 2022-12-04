import React, { useState } from "react";
import { Header, NavBar } from "../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const handleUserInput = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Login</div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              value={loginDetails.email}
              onChange={handleUserInput}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleUserInput}
            />
          </label>
          <Button type="submit">Log In</Button>
        </div>
        <p>
          Click{" "}
          <Link to="/registration" className="underline">
            here
          </Link>{" "}
          to register for a new account.
        </p>
      </form>
    </div>
  );
};

export default Login;
