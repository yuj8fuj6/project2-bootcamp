import React, { useState } from "react";
import { Header, NavBar } from "../components";
import { Button } from "../components";

const CreateStall = () => {
  const emptyStallDetails = {
    stallName: "",
    stallLocation: "",
    foodCenterName: "",
    openingHours: "",
    openingDays: "",
    stallstory: "",
  };

  const [stallFrontPhoto, setStallFrontPhoto] = useState();
  const [otherStallPhotos, setOtherStallPhotos] = useState([]);

  const [stallDetails, setStallDetails] = useState(emptyStallDetails);
  const [stallFrontImg, setStallFrontImg] = useState();
  const [otherStallImgs, setOtherStallImgs] = useState([]);

  const handleStallInputs = (event) => {
    setStallDetails({
      ...stallDetails,
      [event.target.name]: event.target.value,
    });
  };

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

  const submitStallDetails = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>
        <form className="container mx-1 text-left">
          <label>
            Stall Name:
            <input
              name="stallName"
              className="border border-black rounded-lg"
              onChange={handleStallInputs}
              value={stallDetails.stallName}
            />
          </label>
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
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
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

          <div className="container border mx-auto grid grid-cols-3 w-50">
            {otherStallImgs.map((imgs) => (
              <img src={imgs} alt="stall" />
            ))}
            <div className="flex flex-auto items-center justify-center w-30">
              <label className="flex flex-col items-center justify-center w-full h-auto border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
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

          <div className="container p-3 border border-grey rounded-lg">
            <p>Details</p>
            <p className="underline">Location</p>
            <p>
              <label>
                Food Center:
                <input className="border border-black rounded-lg" />
              </label>
            </p>
            <p>
              <label>
                Address:
                <input className="border border-black rounded-lg" />
              </label>
            </p>

            <p className="underline">Opening Hours</p>
            <p>
              <label>
                Days:
                <input className="border border-black rounded-lg" />
              </label>
            </p>
            <p>
              <label>
                Time:
                <input className="border border-black rounded-lg" />
              </label>
            </p>
          </div>
          <Button onSubmit={submitStallDetails}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStall;
