import React, { useState, useContext } from "react";
import { Header, NavBar } from "../components";
import { Button } from "../components";
import { storage, database } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, set, push, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const HAWKER_PHOTOS_FOLDER = "hawkerphotos";
const HAWKER_DATABASE = "hawkers";
const USER_HAWKERS_DATABASE = "user-hawkers/";

const CreateStall = () => {
  const user = useContext(UserContext);
  const emptyStallDetails = {
    stallName: "",
    stallAddress: "",
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
  const [wordCount, setWordCount] = useState(0);

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
  };

  const handleStallInputs = (event) => {
    if (event.target.name === "startingYear") {
      setStallDetails({
        ...stallDetails,
        [event.target.name]: Number(event.target.value),
      });
    }

    if (event.target.name === "stallStory") {
      const userInput = event.target.value;
      const charCount = userInput.length;
      setWordCount(charCount);
      setStallDetails({
        ...stallDetails,
        [event.target.name]: event.target.value,
      });
    }

    setStallDetails({
      ...stallDetails,
      [event.target.name]: event.target.value,
    });
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
    let stallFrontURL = "";

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
          stallFrontURL = url;
        })
      )
    );

    try {
      await Promise.all(uploadPhotoPromises).then(() => {
        const newStall = {
          ...stallDetails,
          userKey: user.uid,
          userEmail: user.contactEmail,
          ownerName: `${user.firstName} ${user.lastName}`,
          stallFrontPhotoURL: stallFrontURL,
          otherStallPhotosURL: otherStallPhotosURLArr,
          contactNumber: user.contactNumber,
        };
        const hawkersListRef = databaseRef(database, HAWKER_DATABASE);
        const newHawkerRef = push(hawkersListRef);
        const newHawkerRefKey = newHawkerRef.key;
        set(newHawkerRef, newStall);

        const userHawkerKeys = databaseRef(
          database,
          USER_HAWKERS_DATABASE + user.uid
        );
        const newHawkerEntry = { [newHawkerRefKey]: newStall.stallName };
        update(userHawkerKeys, newHawkerEntry);
      });
    } catch (error) {
      alert("There was an error - " + error);
    } finally {
      navigate("/profile");
    }
  };

  if (!user) return <div>LOADING...</div>;
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <h1 className="text-left text-green m-1 text-2xl">CREATE STALL</h1>
        <form
          className="container mx-1 text-left"
          onSubmit={submitStallDetails}
        >
          <label className="text-purple">
            Stall Name:
            <input
              name="stallName"
              className="border ml-1 pl-1 pr-1 border-black rounded-lg text-gray-700"
              onChange={handleStallInputs}
              value={stallDetails.stallName}
            />
          </label>
          <p className="text-purple">Stall Front Image:</p>
          <div className="container mx-auto flex flex-wrap">
            <div className="flex flex-auto items-center justify-center w-f">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                {stallFrontImg ? (
                  <div className="container overflow-hidden flex flex-col items-center justify-center">
                    <img
                      src={stallFrontImg}
                      alt="storefront preview"
                      className="p-4 rounded-3xl drop-shadow-xl"
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
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG or JPG
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
              <p className="text-purple font-bold">Other Stall Images:</p>
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
              <p className="text-purple font-bold">Details :</p>
              <p className="text-purple underline">Location</p>
              <p>
                <label className="text-purple">
                  Food Center:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs text-gray-700 pl-1 pr-1"
                    name="foodCenterName"
                    onChange={handleStallInputs}
                  />
                </label>
              </p>
              <p>
                <label className="text-purple">
                  Address:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs text-gray-700 pl-1 pr-1"
                    name="stallAddress"
                    onChange={handleStallInputs}
                  />
                </label>
              </p>

              <p className="text-purple underline">Opening Hours</p>
              <p>
                <label className="text-purple">
                  Days:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs text-gray-700 pl-1 pr-1"
                    name="openingDays"
                    onChange={handleStallInputs}
                  />
                </label>
              </p>
              <p>
                <label className="text-purple">
                  Time:
                  <input
                    className="border border-black rounded-lg w-full max-w-xs text-gray-700 pl-1 pr-1"
                    name="openingHours"
                    onChange={handleStallInputs}
                  />
                </label>
              </p>
            </div>
          </div>
          <div className="container p-3 border border-grey rounded-lg">
            <label>
              <p className="text-purple">Year Started</p>
              <input
                className="border border-black rounded-lg w-full max-w-xs text-gray-700 pl-1 pr-1"
                name="startingYear"
                onChange={handleStallInputs}
              />
            </label>
            <label>
              <p className="text-purple">Our Story</p>
              <textarea
                className="border border-black rounded-lg w-full text-gray-700 pl-1 pr-1"
                type="text"
                name="stallStory"
                onChange={handleStallInputs}
                maxLength={200}
              />
              <p className="text-xxs text-gray-700">
                Letter Count: {wordCount}/200
              </p>
            </label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStall;
