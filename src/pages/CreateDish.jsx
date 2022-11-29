import React, { useState } from "react";
import { Header, NavBar, Button } from "../components";
import { storage, database } from "../firebase";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { ref as databaseRef, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const DISH_PHOTOS_FOLDER = "hawkerphotos";
const DISH_DATABASE = "dish";

const CreateDish = (user) => {
  const defaultDishDetails = {
    dishID: uuidv4(),
    dishName: "",
    stallName: "",
    ingredientList: [],
    attribute: [],
    story: "",
  };
  const [dishMainImg, setDishMainImg] = useState({});
  const [dishOtherImgs, setDishOtherImgs] = useState([]);
  const [dishDetails, setDishDetails] = useState(defaultDishDetails);

  const handleDishInputs = (event) => {
    setDishDetails({
      ...dishDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleDishMainPhoto = (event) => {
    const urlDisplay = URL.createObjectURL(event.target.files[0]);
    setDishMainImg({
      display: urlDisplay,
      file: event.target.files[0],
    });
  };

  const handleOtherDishPhotos = (event) => {
    const urlDisplay = URL.createObjectURL(event.target.files[0]);
    setDishOtherImgs((prevDishImgs) => [
      ...prevDishImgs,
      {
        display: urlDisplay,
        file: event.target.files[0],
      },
    ]);
  };

  const onDishSubmit = (event) => {
    event.preventdefault();
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <h1 className="text-left underline text-orange m-1 text-2xl">
          Create Dish
        </h1>
        <form className="container mx-1 text-left">
          <label className="text-purple">
            Dish Name:
            <input
              name="dishName"
              value={dishDetails.dishName}
              onChange={handleDishInputs}
              className="border border-black rounded-lg text-gray-700 m-1"
            />
          </label>
          <p className="text-purple">Dish Display Image:</p>
          <div className="container mx-auto flex flex-wrap">
            <div className="flex flex-auto items-center justify-center w-f">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {dishMainImg ? (
                  <div className="container overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={dishMainImg.display}
                      alt="dish"
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
                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX 5MB)
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={handleDishMainPhoto}
                />
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="container p-3 border border-gray rounded-lg w-2/3 m-1">
              <h1 className="text-purple text-xl font-bold drop-shadow-md">
                Description
              </h1>
              <p>
                <label className="text-purple text-xs">
                  Story (tell us more about the dish or the stall)
                  <textarea
                    className="border border-black rounded-lg text-gray-700 w-full max-w-xs"
                    name="story"
                  />
                </label>
              </p>
              <p>
                <label className="text-purple text-xs">
                  Ingredient List (separate each ingredient with a comma)
                  <textarea
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="ingredientList"
                  />
                </label>
              </p>
              <p>
                <label className="text-purple text-xs">
                  Taste (separate each taste with a comma)
                  <textarea
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="attribute"
                  />
                </label>
              </p>
            </div>
            <div className="container border rounded m-1 w-1/3">
              <p className="text-purple">Other Photos:</p>
              <div className="grid grid-cols-2">
                {dishOtherImgs.map((photos) => (
                  <img
                    className="rounded-md p-1"
                    src={photos.display}
                    alt="dish"
                  />
                ))}
                <div className="flex flex-auto items-center justify-center w-30">
                  <label className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="pt-5 pb-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleOtherDishPhotos}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDish;
