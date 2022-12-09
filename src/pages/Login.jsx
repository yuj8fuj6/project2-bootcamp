import React, { useEffect, useState } from "react";
import { HeaderLogin } from "../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";

const Login = () => {
  const [user, setUser] = useState(null);
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
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Login failed! Please check if your email address and password are correct.",
        );
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-orange">
      <div className="bg-white w-84 h-4/6 grid grid-cols-1 rounded-xl shadow-xl p-4 space-y-2">
        <div className="flex justify-around flex-wrap p-4">
          <HeaderLogin />
        </div>
        <div className="text-purple drop-shadow-lg font-extrabold text-3xl">
          Login
        </div>
        <form className="bg-white rounded px-8 pt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-purple text-sm font-bold mb-8 text-left">
              Email
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="email"
                value={loginDetails.email}
                onChange={handleUserInput}
              />
            </label>
            <label className="block text-purple text-sm font-bold mb-8 text-left">
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
        </form>
        <div className="text-purple">
          If you do not have an existing account,
          <br />
          <Link
            to="/registration"
            className="text-orange font-semibold hover:text-purple"
          >
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
