import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Header, NavBar } from "../components";
import { Button } from "../components";
import { signOut, getAuth, updateEmail, updatePassword } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref as databaseRef, getDatabase, update } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { BsHandThumbsUp, BsChatLeftText, BsSun } from "react-icons/bs";
import StallList from "../components/StallList";

const USER_PHOTO_FOLDER = "userphotos";

const UserProfile = (props) => {
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
    update(databaseRef(db, `users/${user.uid}`), {
      profilePhoto: null,
    })
      .then(() => {
        alert("Profile picture has been changed.");
      })
      .catch((error) => {
        alert("There was an error in the update - " + error);
      });
  };

  const tempProfilePhotoIcon = (
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
  );

  const tempProfilePhoto = profilePhoto ? (
    <div className="flex justify-center container max-w-none mt-5">
      <img
        src={profilePhoto.display}
        alt="profile display"
        className="w-64 h-64 max-w-none rounded-full object-cover"
      />
    </div>
  ) : (
    tempProfilePhotoIcon
  );

  useEffect(() => {
    if (user.profilePhoto) setProfilePhoto(null);
  }, [user.profilePhoto]);

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
        props.clearUserDetails();
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const db = getDatabase();
  const authDetails = getAuth();

  const updateUserProfile = (event) => {
    event.preventDefault();

    update(databaseRef(db, `users/${user.uid}`), {
      contactEmail: userInfo.contactEmail,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      password: userInfo.password,
      username: userInfo.username,
      contactNumber: userInfo.contactNumber,
    })
      .then(() => {
        alert("Your profile has been updated successfully.");
      })
      .catch((error) => {
        alert("There was an error in the update - " + error);
      });

    updateEmail(authDetails.currentUser, `${userInfo.contactEmail}`)
      .then(() => console.log("Email updated!"))
      .catch((error) => {
        console.log(error);
        alert("There was an error in authentication - " + error);
      });

    updatePassword(authDetails.currentUser, `${userInfo.password}`)
      .then(() => console.log("Password updated!"))
      .catch((error) => {
        console.log(error);
        alert("There was an error in authentication -" + error);
      });

    setEditMode(false);
  };

  const updateUserPhoto = (event) => {
    event.preventDefault();

    let profilePhotoURL = "";

    const profilePhotoRef = storageRef(
      storage,
      `${USER_PHOTO_FOLDER}/${profilePhoto.file.name}`
    );

    uploadBytes(profilePhotoRef, profilePhoto.file)
      .then(() =>
        getDownloadURL(profilePhotoRef).then((url) => {
          profilePhotoURL = url;

          update(databaseRef(db, `users/${user.uid}`), {
            profilePhoto: profilePhotoURL,
          });
        })
      )
      .catch((error) => {
        console.log(error);
        alert("Failed to upload profile photo!");
      });

    alert("Profile photo has been successfully uploaded!");
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="w-screen mt-5 mb-10">
        <div className="flex justify-around w-screen space-x-20">
          {userInfo.userType === "user" && (
            <div className="text-xl text-orange font-bold drop-shadow-xl">
              User Profile
            </div>
          )}
          {userInfo.userType === "hawker" && (
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
          {user.profilePhoto ? (
            <div className="flex justify-center container max-w-none mt-5">
              <img
                src={user.profilePhoto}
                alt="profile display"
                className="w-64 h-64 max-w-none rounded-full object-cover"
              />
            </div>
          ) : (
            tempProfilePhoto
          )}

          {editMode ? (
            <>
              <label className="flex justify-center mt-5">
                <p className="text-purple p-2 m-2 underline">Upload Photo</p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleProfilePhoto}
                />
              </label>
              <Button type="button" onClick={updateUserPhoto}>
                Confirm Photo
              </Button>
              <label>
                <p className="mt-5 text-left ml-16">First Name</p>
              </label>
              <input
                className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleUserInput}
              />
              <label>
                <p className="mt-5 text-left ml-16">Last Name</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  name="lastName"
                  placeholder={userInfo.lastName}
                  value={userInfo.lastName}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Contact Number</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  name="contactNumber"
                  value={userInfo.contactNumber}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Contact Email</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  name="contactEmail"
                  value={userInfo.contactEmail}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Username</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  name="username"
                  value={userInfo.username}
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Password</p>
                <input
                  type="password"
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 mb-5 indent-3"
                  placeholder="*******"
                  name="password"
                  onChange={handleUserInput}
                  minLength="6"
                />
              </label>
            </>
          ) : (
            <>
              {user.userType === "user" && (
                <div className="flex flex-wrap justify-center space-x-3 mt-5 text-orange">
                  <div className="text-3xl font-semibold">
                    <BsHandThumbsUp />
                    <div className="text-xs">Likes Made</div>
                  </div>
                  <div>{user.likesDone}</div>
                  <div className="text-3xl font-semibold">
                    <BsChatLeftText />
                    <div className="text-xs">Reviews Made</div>
                  </div>
                  <div>{user.reviewsDone}</div>
                  <div className="text-3xl font-semibold">
                    <BsSun />
                    <div className="text-xs">Karma Points</div>
                  </div>
                  <div>{user.karmaPoints}</div>
                </div>
              )}
              <label>
                <p className="mt-5 text-left ml-16">First Name</p>
              </label>
              <input
                className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                placeholder={user.firstName}
              />
              <label>
                <p className="mt-5 text-left ml-16">Last Name</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  placeholder={user.lastName}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Contact Email</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  placeholder={user.contactEmail}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Contact Number</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  placeholder={user.contactNumber}
                  name="contactNumber"
                  onChange={handleUserInput}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Username</p>
                <input
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 indent-3"
                  placeholder={user.username}
                />
              </label>
              <label>
                <p className="mt-5 text-left ml-16">Password</p>
                <input
                  type="password"
                  className="border border-neutral-300 w-3/4 rounded-lg mt-2 mb-5 indent-3"
                  placeholder="*******"
                  minLength="6"
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
              <Button type="button" onClick={() => navigate("/createStall")}>
                Create New Stall
              </Button>
            </p>
            <StallList />
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
