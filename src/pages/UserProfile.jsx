import React from "react";
import { Header, NavBar } from "../components";
import { Button } from "../components";

const UserProfile = () => {
  const handleFileUpload = (event) => {
    console.log(event);
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>UserProfile</div>
      <div>
        <form>
          Profile Picture
          <svg
            className="w-2/5 h-auto"
            viewBox="0 0 32 32"
            enableBackground="new 0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <circle
                cx="16"
                cy="16"
                fill="none"
                r="15"
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0"
                fill="none"
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <circle
                cx="16"
                cy="11"
                fill="none"
                r="6"
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </g>
          </svg>
          <label>
            <p className="border border-purple bg-purple text-white w-28 p-2 rounded-3xl m-2">
              Upload Photo
            </p>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <label>
            <p>First Name</p>
            <input className="border border-black rounded-lg" />
          </label>
          <label>
            <p>Last Name</p>
            <input className="border border-black rounded-lg" />
          </label>
          <label>
            <p>Contact Number</p>
            <input className="border border-black rounded-lg" />
          </label>
          <label>
            <p>Stall Name</p>
            <input className="border border-black rounded-lg" />
          </label>
          <label>
            <p>Stall Location</p>
            <input className="border border-black rounded-lg" />
          </label>
          <label>
            <p>Username</p>
            <input className="border border-black rounded-lg" />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              className="border border-black rounded-lg mb-2"
            />
          </label>
          <p className="m-2">
            <Button>Update Details</Button>
          </p>
        </form>
        <p className="m-2">
          <Button>Create New Stall</Button>
        </p>
        <p className="m-2">
          <Button>Edit Existing Stall</Button>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
