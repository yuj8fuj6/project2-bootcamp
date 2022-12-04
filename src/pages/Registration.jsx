import React, { useState } from "react";
import { database, auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { push, ref as databaseRef, set } from "firebase/database";
import { Header, NavBar } from "../components";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const USER_PROFILES_DATABASE = "users/";
const USER_EMAIL = "userkeys/";

const Registration = () => {
  const defaultForm = {
    firstName: "",
    lastName: "",
    contactEmail: "",
    username: "",
    password: "",
  };

  const [registrationDetails, setRegistrationDetails] = useState(defaultForm);
  const [displayedForm, setDisplayedForm] = useState("user");
  const [errorCode, setErrorCode] = useState();

  const handleFormInputs = (event) => {
    setRegistrationDetails({
      ...registrationDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (event) => {
    setDisplayedForm(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      registrationDetails.contactEmail,
      registrationDetails.password
    )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: registrationDetails.username,
        });

        const usersListRef = databaseRef(
          database,
          USER_PROFILES_DATABASE + user.uid
        );

        const emailUIDListRef = databaseRef(
          database,
          USER_EMAIL + registrationDetails.contactEmail.replace(".", ",")
        );

        set(usersListRef, {
          username: registrationDetails.username,
          firstName: registrationDetails.firstName,
          lastName: registrationDetails.lastName,
          contactEmail: registrationDetails.contactEmail,
          date: Date(),
          userType: displayedForm,
        });

        set(emailUIDListRef, user.uid);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorCode({ code: error.code, message: error.message });
        console.log(errorCode);
      });
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      {errorCode && <p>{errorCode.message}</p>}
      <div className="inline-block relative w-64">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Choose Account Type
          <select
            onChange={handleSelect}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="user">User</option>
            <option value="hawker">Hawker</option>
          </select>
        </label>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <p>
        {displayedForm.charAt(0).toUpperCase() + displayedForm.slice(1)} Sign Up
      </p>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
            <input
              onChange={handleFormInputs}
              name="firstName"
              value={registrationDetails.firstName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
            <input
              onChange={handleFormInputs}
              name="lastName"
              value={registrationDetails.lastName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact Email
            <input
              onChange={handleFormInputs}
              value={registrationDetails.contactEmail}
              name="contactEmail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
            <input
              onChange={handleFormInputs}
              value={registrationDetails.username}
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
            <input
              onChange={handleFormInputs}
              value={registrationDetails.password}
              type="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          <div className="md:w-2/3">
            <Button type="submit">Sign Up</Button>
            <p>
              Click{" "}
              <Link to="/login" className="underline">
                here
              </Link>{" "}
              to log in instead.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
