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
      <div>UserProfile</div>
      <div>
        <Button type="button" onClick={signOutUser}>
          Sign-Out
        </Button>
        <form>
          <p>Profile Picture</p>

          {profilePhoto ? (
            <div className="container w-3/4 max-w-none">
              <img
                src={profilePhoto.display}
                alt="profile display"
                className="w-full max-w-none rounded-full object-contain"
              />
            </div>
          ) : (
            <svg
              className="w-2/5 m-w-none h-auto"
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
          )}

          {editMode ? (
            <>
              <label>
                <p className="border border-purple bg-purple text-white w-28 p-2 rounded-3xl m-2">
                  Upload Photo
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePhoto}
                />
              </label>
              <label>
                <p>First Name</p>
                <input
                  className="border border-black rounded-lg"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p>Last Name</p>
                <input
                  className="border border-black rounded-lg"
                  name="lastName"
                  placeholder={userInfo.lastName}
                  value={userInfo.lastName}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p>Contact Email</p>
                <input
                  className="border border-black rounded-lg"
                  name="contactEmail"
                  value={userInfo.contactEmail}
                  onChange={handleUserInput}
                />
              </label>

              <label>
                <p>Username</p>
                <input
                  className="border border-black rounded-lg"
                  name="username"
                  value={userInfo.username}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p>Password</p>
                <input
                  type="password"
                  className="border border-black rounded-lg mb-2"
                  placeholder="*******"
                  name="password"
                  onChange={handleUserInput}
                />
              </label>
              <p className="m-2"></p>
            </>
          ) : (
            <>
              <label>
                <p>First Name</p>
                <input
                  className="border border-black rounded-lg"
                  placeholder={user.firstName}
                />
              </label>

              <label>
                <p>Last Name</p>
                <input
                  className="border border-black rounded-lg"
                  placeholder={user.lastName}
                />
              </label>
              <label>
                <p>Contact Email</p>
                <input
                  className="border border-black rounded-lg"
                  placeholder={user.contactEmail}
                />
              </label>

              <label>
                <p>Username</p>
                <input
                  className="border border-black rounded-lg"
                  placeholder={user.username}
                />
              </label>

              <label>
                <p>Password</p>
                <input
                  type="password"
                  className="border border-black rounded-lg mb-2"
                  placeholder="*******"
                />
              </label>
            </>
          )}
          <p className="m-2">
            {editMode ? (
              <Button type="button" onClick={updateUserProfile}>
                Update Details
              </Button>
            ) : (
              <Button type="button" onClick={onClickEditMode}>
                Edit Details
              </Button>
            )}
          </p>
        </form>
        {userInfo.userType === "hawker" && (
          <>
            <p className="m-2">
              <Button type="button" onClick={() => navigate("/createDish")}>
                Create New Stall
              </Button>
            </p>
            <p className="m-2">
              <Button type="button">Edit Existing Stall</Button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
