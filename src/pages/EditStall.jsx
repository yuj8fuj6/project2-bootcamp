import React, { useState, useContext } from "react";
import { Header, NavBar } from "../components";
import { Button } from "../components";
import { UserContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { getDatabase, update, ref as databaseRef } from "firebase/database";

const HAWKER_PHOTOS_FOLDER = "hawkerphotos";
const HAWKER_DATABASE = "hawkers";
const USER_HAWKERS_DATABASE = "user-hawkers/";

const EditStall = () => {
  const user = useContext(UserContext);
  const { state } = useLocation();
  console.log(state);
  console.log(user);

  const currentStallDetails = state;
  const [editStallDetails, setEditStallDetails] = useState(currentStallDetails);
  let {
    foodCenterName,
    openingDays,
    openingHours,
    otherStallPhotosURL,
    stallAddress,
    stallFrontPhotoURL,
    stallStory,
    startingYear,
    stallName,
  } = editStallDetails;

  const handleStallDetailsInput = (event) => {
    setEditStallDetails({
      ...editStallDetails,
      [event.target.name]: event.target.value,
    });
  };

  console.log(editStallDetails);

  const db = getDatabase();
  const navigate = useNavigate();

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const newStallData = editStallDetails;

    const updates = {};
    updates[`hawkers/${state.stallKey}/`] = newStallData;
    updates[`user-hawkers/${user.uid}/${state.stallKey}`] =
      newStallData.stallName;

    update(databaseRef(db), updates);
    navigate("/profile");
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <form className="container mx-1 text-left" onSubmit={handleEditSubmit}>
          <label>
            Stall Name:
            <input
              name="stallName"
              value={stallName}
              className="border border-black rounded-lg"
              onChange={handleStallDetailsInput}
            />
          </label>
          <p>Stall Front Image:</p>
          <div className="container mx-auto flex flex-wrap">
            <div className="flex flex-auto items-center justify-center w-f">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {stallFrontPhotoURL ? (
                  <div className="container overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={editStallDetails.stallFrontPhotoURL}
                      alt="storefront preview"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-grey-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX 5MB)
                    </p>
                  </div>
                )}

                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="container border rounded m-1 w-1/2">
              <p>Other Stall Images:</p>
              <div className="grid grid-cols-3">
                {otherStallPhotosURL.map((imgs) => (
                  <img src={imgs} alt="stall" />
                ))}
                <div className="flex flex-auto items-center justify-center w-30">
                  <label className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="pt-5 pb-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="container p-3 border border-grey rounded-lg w-1/2 m-1">
              <p>Details</p>
              <p className="underline">Location</p>
              <p>
                <label>
                  Food Center:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="foodCenterName"
                    value={foodCenterName}
                    onChange={handleStallDetailsInput}
                  />
                </label>
              </p>
              <p>
                <label>
                  Address:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="stallAddress"
                    value={stallAddress}
                    onChange={handleStallDetailsInput}
                  />
                </label>
              </p>

              <p className="underline">Opening Hours</p>
              <p>
                <label>
                  Days:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="openingDays"
                    value={openingDays}
                    onChange={handleStallDetailsInput}
                  />
                </label>
              </p>
              <p>
                <label>
                  Time:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="openingHours"
                    value={openingHours}
                    onChange={handleStallDetailsInput}
                  />
                </label>
              </p>
            </div>
          </div>
          <div className="container p-3 border border-grey rounded-lg">
            <label>
              <p>Year Started</p>
              <input
                className="border border-black rounded-lg w-full max-w-xs"
                name="startingYear"
                value={startingYear}
                onChange={handleStallDetailsInput}
              />
            </label>
            <label>
              <p>Our Story</p>
              <textarea
                className="border border-black rounded-lg w-full"
                type="text"
                value={stallStory}
                name="stallStory"
                onChange={handleStallDetailsInput}
              />
            </label>
          </div>
          <Button type="submit">Edit Stall</Button>
        </form>
      </div>
    </div>
  );
};

export default EditStall;
