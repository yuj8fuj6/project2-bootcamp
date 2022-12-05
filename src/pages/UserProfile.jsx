import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Header, NavBar } from "../components";
import { Button } from "../components";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const UserProfile = () => {
  const user = useContext(UserContext);
  const [profilePhoto, setProfilePhoto] = useState();
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({ ...user });
  console.log(userInfo);

  const handleProfilePhoto = (event) => {
    const urlDisplay = URL.createObjectURL(event.target.files[0]);
    setProfilePhoto({
      display: urlDisplay,
      file: event.target.files[0],
    });
  };

  const handleUserInput = (event) => {
    console.log(userInfo);
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onClickEditMode = (event) => {
    event.preventDefault();
    const newLocal = !editMode;
    setEditMode(newLocal);
    console.log(userInfo, user);
  };

  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // May need to do something to the database as logging out happens faster than DOM update.

  // Uploading of user photo not included yet.

  const updateUserProfile = (event) => {
    event.preventDefault();
    console.log("updating user profile");
    console.log(userInfo);
    console.log(user);

    setEditMode(false);
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="w-screen  mt-5">
        <div className="flex justify-around w-screen space-x-20">
          {userInfo.userType == "user" && (
            <div className="text-xl text-orange font-bold drop-shadow-xl">
              User Profile
            </div>
          )}
          {userInfo.userType == "hawker" && (
            <div className="text-xl text-orange font-bold drop-shadow-xl">
              Hawker Profile
            </div>
          )}
          <Button type="button" onClick={signOutUser}>
            Sign-Out
          </Button>
        </div>
        <form className=" text-purple font-bold">
          <p className="mt-5 text-xl">Profile Picture</p>
          {profilePhoto ? (
            <div className="flex justify-center container max-w-none mt-5">
              <img
                src={profilePhoto.display}
                alt="profile display"
                className="w-64 h-64 max-w-none rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center mt-5">
              <svg
                className="w-64 m-w-none h-auto"
                viewBox="0 0 32 32"
                enableBackground="new 0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <circle
                    cx="16"
                    cy="16"
                    fill="#D3D3D3"
                    r="15"
                    stroke="#D3D3D3"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                  <path
                    d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0"
                    fill="none"
                    stroke="white"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                  <circle
                    cx="16"
                    cy="11"
                    fill="none"
                    r="6"
                    stroke="white"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>
          )}

          {editMode ? (
            <>
              <label className="flex justify-center mt-5">
                <p className="border border-purple bg-purple text-white p-2 rounded-3xl m-2">
                  Upload Photo
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePhoto}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">First Name</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Last Name</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  name="lastName"
                  placeholder={userInfo.lastName}
                  value={userInfo.lastName}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Contact Email</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  name="contactEmail"
                  value={userInfo.contactEmail}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Username</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  name="username"
                  value={userInfo.username}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Password</p>
                <input
                  type="password"
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 mb-5"
                  placeholder="*******"
                  name="password"
                  onChange={handleUserInput}
                />
              </label>
            </>
          ) : (
            <>
              <label>
                <p className="mt-5 text-left ml-16">First Name</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  placeholder={user.firstName}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Last Name</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  placeholder={user.lastName}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Contact Email</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  placeholder={user.contactEmail}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Username</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2"
                  placeholder={user.username}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Password</p>
                <input
                  type="password"
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 mb-5"
                  placeholder="*******"
                />
              </label>
            </>
          )}

          {editMode ? (
            <>
              <p className="m-2 mt-5">
                <Button type="button" onClick={updateUserProfile}>
                  Update Details
                </Button>
              </p>
            </>
          ) : (
            <>
              <p className="m-2 mt-5">
                <Button type="button" onClick={onClickEditMode}>
                  Edit Details
                </Button>
              </p>
            </>
          )}
        </form>
        {userInfo.userType === "hawker" && (
          <>
            <p className="m-2 mt-5">
              <Button type="button" onClick={() => navigate("/createDish")}>
                Create New Stall
              </Button>
            </p>
            <p className="m-2 mt-5 mb-10">
              <Button type="button">Edit Existing Stall</Button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
