import React from "react";
import { Header, NavBar } from "../components";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";

const Stall = (props) => {
  const hawkerData = props.hawkerData;
  console.log(hawkerData);

  // Filter Function to be added here.
  const hawkerSelected = hawkerData[0];

  // Stall Front Photo
  const stallFrontPhoto = (
    <img
      src={hawkerSelected.val.stallFrontPhotoURL}
      className="p-4 rounded-3xl drop-shadow-xl"
    />
  );

  // // Other Stall Photos
  // const otherStallPhotos = hawkerSelected.val.stallFrontPhotoURL.map(
  //   (photoURL) => <img src={photoURL} className="w-1/3 m-2 rounded-lg" />,
  // );

  // To delete once array of other stall photos
  const otherStallPhotos = (
    <img
      src={hawkerSelected.val.stallFrontPhotoURL}
      className="w-1/3 m-2 rounded-lg"
    />
  );

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="flex justify-evenly flex-wrap w-screen">
        <div className="text-left w-1/2 pl-4">
          <p className="text-orange text-xl font-semibold drop-shadow-lg">
            {hawkerSelected.val.stallName}
          </p>
        </div>
        <div className="flex flex-wrap justify-center space-x-1 mt-0.5 text-purple w-1/2">
          <div className="text-xxs text-left w-1/3">
            Total Number of Likes and Reviews for Dishes
          </div>
          <div className="text-3xl font-semibold">
            <BsHandThumbsUp />
            <div className="text-xxs">Likes</div>
          </div>
          <div>100</div>
          <div className="text-3xl font-semibold">
            <BsChatLeftText />
            <div className="text-xxs">Reviews</div>
          </div>
          <div>20</div>
        </div>
        {stallFrontPhoto}
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          {otherStallPhotos}
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          <div className="shadow-xl border-1 rounded-2xl p-3 mt-1 mb-1">
            <p className="text-xl font-semibold drop-shadow-lg">Description</p>
            <p className="text-xs lg:text-sm font-bold underline mt-2">
              Location
            </p>
            <p className="text-xs lg:text-sm mt-2">
              {hawkerSelected.val.stallAddress}
            </p>
            <p className="text-xs lg:text-sm font-bold underline mt-2">
              Opening Hours
            </p>
            <p className="text-xs lg:text-sm mt-2">
              {hawkerSelected.val.openingHours}
            </p>
          </div>
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          <p className="text-xl font-semibold drop-shadow-lg">Our Story</p>
          <p className="text-xs lg:text-sm mt-2">
            {hawkerSelected.val.stallAddress}
          </p>
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1"></div>
      </div>
    </div>
  );
};

export default Stall;
