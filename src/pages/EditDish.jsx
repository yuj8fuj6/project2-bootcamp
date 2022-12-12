import React, { useState, useContext } from "react";
import { Header, NavBar, Button } from "../components";
import { storage, database } from "../firebase";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { ref as databaseRef, update } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const EditDish = () => {
  const user = useContext(UserContext);
  const { state } = useLocation();
  const currentDish = state;
  const mainDisplay = state.photoURLs[0];
  const otherPhotos = state.photoURLs.slice(1);
  console.log(state);

  const [dishDetails, setDishDetails] = useState(currentDish);

  //uploaded dish photos
  const [dishMainDisplay, setDishMainDisplay] = useState(mainDisplay);
  const [dishOtherPhotos, setDishOtherPhotos] = useState(otherPhotos);

  //to be uploaded dish photos
  const [dishMainImg, setDishMainImg] = useState();
  const [newDishImgs, setNewDishImgs] = useState([]);
  const [newDishOtherDisplay, setNewDishOtherDisplay] = useState([]);
  console.log(newDishImgs);

  const [loadingMessage, setLoadingMessage] = useState();

  const handleDishInputs = (event) => {
    setDishDetails({
      ...dishDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewDishMainPhoto = (event) => {
    const urlDisplay = URL.createObjectURL(event.target.files[0]);
    setDishMainDisplay(urlDisplay);
    setDishMainImg(event.target.files[0]);
  };

  const handleOtherDishPhotos = (event) => {
    const urlDisplay = URL.createObjectURL(event.target.files[0]);
    setNewDishImgs((prevDishImgs) => [...prevDishImgs, event.target.files[0]]);
    setNewDishOtherDisplay((prevDishPhotos) => [...prevDishPhotos, urlDisplay]);
  };

  const removeOldPhoto = (index) => {
    const newPhotoList = dishOtherPhotos.filter((photo, key) => key !== index);
    setDishOtherPhotos(newPhotoList);
  };

  const removeNewPhoto = (index) => {
    const newPhotoList = newDishImgs.filter((photo, key) => key !== index);
    setNewDishImgs(newPhotoList);
  };

  const navigate = useNavigate();

  const onDishEditSubmit = async (event) => {
    event.preventDefault();

    const promises = [];
    const newPhotoURLs = [];
    let newDishMainPhoto = [];

    if (dishMainImg) {
      const dishMainPhotoRef = storageRef(
        storage,
        `dishphotos/${dishMainImg.name}`
      );
      const uploadDishMainPhoto = uploadBytes(dishMainPhotoRef, dishMainImg)
        .then(() =>
          getDownloadURL(dishMainPhotoRef).then((url) => {
            newDishMainPhoto = [url];
          })
        )
        .catch((error) => alert(error));

      promises.push(uploadDishMainPhoto);
    }

    for (let i = 0; i < newDishImgs.length; i++) {
      console.log("start");
      const dishPhotoRef = storageRef(
        storage,
        `dishphotos/${newDishImgs[i].name}`
      );
      promises.push(
        uploadBytes(dishPhotoRef, newDishImgs[i]).then(async () => {
          await getDownloadURL(dishPhotoRef).then((url) => {
            newPhotoURLs.push(url);
          });
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        const newDishPhotoURLsArr = [
          ...newDishMainPhoto,
          ...dishOtherPhotos,
          ...newPhotoURLs,
        ];
        const newDishData = { ...dishDetails, photoURLs: newDishPhotoURLsArr };
        const updates = {};
        updates[`hawker-dishes/${state.hawkerKey}`] = newDishData.dishName;
        updates[`dishes/${state.dishKey}`] = newDishData;

        update(databaseRef(database), updates);
      })
      .then(() => navigate("/profile"));
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <h1 className="text-left text-orange m-1 text-2xl">Edit Dish</h1>
        <form className="container mx-1 text-left" onSubmit={onDishEditSubmit}>
          <label className="text-purple">
            Dish Name:
            <input
              name="dishName"
              value={dishDetails.dishName}
              className="border border-black rounded-lg text-gray-700 m-1"
              onChange={handleDishInputs}
            />
          </label>
          <p className="text-purple">Dish Display Image:</p>
          <div className="container mx-auto flex flex-wrap">
            <div className="flex flex-auto items-center justify-center w-f">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {dishDetails.photoURLs ? (
                  <div className="container overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={dishMainDisplay}
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
                  onChange={handleNewDishMainPhoto}
                />
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="container p-3 border border-gray rounded-lg w-2/3 m-1">
              <h1 className="text-purple text-xl font-bold drop-shadow-md">
                Description
              </h1>
              <label className="text-purple text-xs">
                Price
                <p>
                  <input
                    className="border border-black text-gray-700 rounded-lg w-16 max-w-xs mr-1 pl-1"
                    name="price"
                    onChange={handleDishInputs}
                    value={dishDetails.price}
                    type="number"
                    step="0.01"
                    min="0"
                  />
                  SGD
                </p>
              </label>
              <p>
                <label className="text-purple text-xs">
                  Ingredient List (separate each ingredient with a comma)
                  <textarea
                    className="border border-black text-gray-700 rounded-lg w-full max-w-xs"
                    name="ingredientList"
                    value={dishDetails.ingredientList}
                    onChange={handleDishInputs}
                  />
                </label>
              </p>
              <p>
                <label className="text-purple text-xs">
                  Taste (separate each taste with a comma)
                  <textarea
                    className="border border-black text-gray-700 rounded-lg w-full max-w-xs"
                    name="attribute"
                    value={dishDetails.attribute}
                    onChange={handleDishInputs}
                  />
                </label>
              </p>
              <p>
                <label className="text-purple text-xs">
                  Story (tell us more about the dish or the stall)
                  <textarea
                    className="border border-black rounded-lg text-gray-700 w-full max-w-xs"
                    name="story"
                    value={dishDetails.story}
                    onChange={handleDishInputs}
                  />
                </label>
              </p>
            </div>
            <div className="container border rounded m-1 w-1/3">
              <p className="text-purple">Other Photos:</p>
              <div className="grid grid-cols-2">
                {dishOtherPhotos.map((photo, index) => (
                  <div className="relative group">
                    <img
                      key={index}
                      className="rounded-md p-1"
                      src={photo}
                      alt="dish"
                    />
                    <button
                      type="button"
                      className="absolute hidden group-hover:block bottom-1/2 left-1/2 rounded-full border bg-indigo-500 opacity-80 text-slate-50"
                      onClick={() => removeOldPhoto(index)}
                    >
                      delete
                    </button>
                  </div>
                ))}
                {newDishOtherDisplay.map((photo, index) => (
                  <div className="relative group">
                    <img
                      key={index}
                      className="rounded-md p-1"
                      src={photo}
                      alt="dish"
                    />
                    <button
                      type="button"
                      className="absolute hidden group-hover:block bottom-1/2 left-1/2 rounded-full border bg-indigo-500 opacity-80 text-slate-50"
                      onClick={() => removeNewPhoto(index)}
                    >
                      delete
                    </button>
                  </div>
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
            <Button type="submit">Edit Dish</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDish;
