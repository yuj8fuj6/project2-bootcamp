import React, { useState } from "react";
import { Header, NavBar } from "../components";
import { Button } from "../components";
import { storage, database } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  ref as databaseRef,
  set,
  push,
  child,
  update,
} from "firebase/database";
import { useNavigate } from "react-router-dom";

const HAWKER_PHOTOS_FOLDER = "hawkerphotos";
const HAWKER_DATABASE = "hawkers";

const CreateStall = ({ user }) => {
  const emptyStallDetails = {
    stallName: "",
    stallLocation: "",
    foodCenterName: "",
    openingHours: "",
    openingDays: "",
    stallStory: "",
  };

  const [stallDetails, setStallDetails] = useState(emptyStallDetails);
  const [stallFrontPhoto, setStallFrontPhoto] = useState();
  const [otherStallPhotos, setOtherStallPhotos] = useState([]);
  const [stallFrontImg, setStallFrontImg] = useState();
  const [otherStallImgs, setOtherStallImgs] = useState([]);

  const handleStallFrontPhoto = (event) => {
    setStallFrontImg(URL.createObjectURL(event.target.files[0]));
    setStallFrontPhoto(event.target.files[0]);
  };

  const handleOtherStallPhotos = (event) => {
    setOtherStallImgs((prevPhotos) => [
      URL.createObjectURL(event.target.files[0]),
      ...prevPhotos,
    ]);
    setOtherStallPhotos((prevPhotos) => [...prevPhotos, event.target.files[0]]);
    console.log(otherStallPhotos);
  };

  const handleStallInputs = (event) => {
    setStallDetails({
      ...stallDetails,
      [event.target.name]: event.target.value,
    });
    console.log(stallDetails);
  };

  let navigate = useNavigate();

  const submitStallDetails = async function (event) {
    event.preventDefault();

    const stallFrontPhotoRef = storageRef(
      storage,
      `${HAWKER_PHOTOS_FOLDER}/${stallFrontPhoto.name}`
    );

    const uploadPhotoPromises = [];
    const otherStallPhotosURLArr = [];
    let stallFrontPhotoURLRef = "";

    for (let i = 0; i < otherStallPhotos.length; i++) {
      const otherStallPhotosRef = storageRef(
        storage,
        `${HAWKER_PHOTOS_FOLDER}/${otherStallPhotos[i].name}`
      );

      uploadPhotoPromises.push(
        await uploadBytes(otherStallPhotosRef, otherStallPhotos[i])
          .then(() => {
            getDownloadURL(otherStallPhotosRef).then((url) => {
              otherStallPhotosURLArr.push(url);
              console.log(otherStallPhotosURLArr);
            });
          })
          .catch((error) => {
            console.log(error);
          })
      );
    }

    uploadPhotoPromises.push(
      await uploadBytes(stallFrontPhotoRef, stallFrontPhoto).then(() =>
        getDownloadURL(stallFrontPhotoRef).then((url) => {
          stallFrontPhotoURLRef = url;
        })
      )
    );

    try {
      await Promise.all(uploadPhotoPromises).then(() => {
        setStallDetails({
          ...stallDetails,
          otherStallPhotosURL: otherStallPhotosURLArr,
          stallFrontPhotoURL: stallFrontPhotoURLRef,
          userEmail: user,
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      const hawkersListRef = databaseRef(database, HAWKER_DATABASE);
      const newHawkerRef = push(hawkersListRef);
      set(newHawkerRef, { ...stallDetails });
    }
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <form
          className="container mx-1 text-left"
          onSubmit={submitStallDetails}
        >
          <label>
            Stall Name:
            <input
              name="stallName"
              className="border border-black rounded-lg"
              onChange={handleStallInputs}
              value={stallDetails.stallName}
            />
          </label>
          <p>Stall Front Image:</p>
          <div className="container mx-auto flex flex-wrap">
            <div className="flex flex-auto items-center justify-center w-f">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {stallFrontImg ? (
                  <div className="container overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={stallFrontImg}
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

                <input
                  type="file"
                  className="hidden"
                  onChange={handleStallFrontPhoto}
                />
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="container border rounded m-1 w-1/2">
              <p>Other Stall Images:</p>
              <div className="grid grid-cols-3">
                {otherStallImgs.map((imgs) => (
                  <img src={imgs} alt="stall" />
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
                      onChange={handleOtherStallPhotos}
                    />
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
                    onChange={handleStallInputs}
                  />
                </label>
              </p>
              <p>
                <label>
                  Address:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="stallLocation"
                    onChange={handleStallInputs}
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
                    onChange={handleStallInputs}
                  />
                </label>
              </p>
              <p>
                <label>
                  Time:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs"
                    name="openingHours"
                    onChange={handleStallInputs}
                  />
                </label>
              </p>
            </div>
          </div>
          <div className="container p-3 border border-grey rounded-lg">
            <label>
              <p>Our Story</p>
              <textarea
                className="border border-black rounded-lg w-full"
                type="text"
                name="stallStory"
                onChange={handleStallInputs}
              />
            </label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStall;
