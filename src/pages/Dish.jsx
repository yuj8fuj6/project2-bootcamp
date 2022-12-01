import React, { useState } from "react";
import { Header, NavBar, Button, FormOrder, FormReview } from "../components";
import {
  BsHandThumbsUp,
  BsChatLeftText,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Dish = (props) => {
  const dishData = props.dishData;
  // console.log(dishData);

  //Filter Function to be added here.
  const dishSelected = dishData[0];
  // console.log(dishSelected);

  //Try to make image modal popup.
  const dishPhotos = dishSelected.val.photoURLs.map((photoURL) => (
    <img src={photoURL} className="w-1/3 m-2 rounded-lg" />
  ));

  const dishIngredients = dishSelected.val.ingredientList.map((item) => (
    <ul>
      <li>{item}</li>
    </ul>
  ));

  const dishAttributes = dishSelected.val.attribute.map((item) => (
    <>{item}, </>
  ));

  const [checked, setChecked] = useState({
    like: false,
  });
  // Like function to be passed into Firebase realtime storage

  //To comment out later
  const reviews = [
    {
      reviewID: 1,
      name: "Tom",
      usertype: "Regular User",
      date: "12 November 2022",
      likes: "100",
      imgURL: "/SampleProfilePhotos/user1.jpg",
      content:
        "Tantalizingly delicious! Would visit again! Mr. Tan was very friendly and the food was great. Need another bowl of that prawn noodles.",
    },
    {
      reviewID: 1,
      name: "Tom",
      usertype: "Regular User",
      date: "12 November 2022",
      likes: "100",
      imgURL: "/SampleProfilePhotos/user1.jpg",
      content:
        "Tantalizingly delicious! Would visit again! Mr. Tan was very friendly and the food was great. Need another bowl of that prawn noodles.",
    },
    {
      reviewID: 1,
      name: "Tom",
      usertype: "Regular User",
      date: "12 November 2022",
      likes: "100",
      imgURL: "/SampleProfilePhotos/user1.jpg",
      content:
        "Tantalizingly delicious! Would visit again! Mr. Tan was very friendly and the food was great. Need another bowl of that prawn noodles.",
    },
    {
      reviewID: 1,
      name: "Tom",
      usertype: "Regular User",
      date: "12 November 2022",
      likes: "100",
      imgURL: "/SampleProfilePhotos/user1.jpg",
      content:
        "Tantalizingly delicious! Would visit again! Mr. Tan was very friendly and the food was great. Need another bowl of that prawn noodles.",
    },
  ];

  const reviewList = reviews.map((review) => (
    <div className="flex flex-wrap mb-3">
      <img
        src={review.imgURL}
        alt="profile"
        className="rounded-full drop-shadow-xl w-24 h-24 lg:w-48 lg:h-48 object-cover mt-4"
      />
      <div className="grid grid-cols-1 w-4/6 pl-4 mt-4">
        <div className="font-extrabold">
          <p>
            {review.name} - <span className="italic">{review.usertype}</span>
          </p>
          <p className="font-normal">{review.date}</p>
        </div>
        <div>
          <div className="flex flex-wrap justify-start space-x-2 mt-2 text-purple">
            <div className="text-3xl font-semibold">
              <BsHandThumbsUp />
              <div className="text-xxs">Likes</div>
            </div>
            <div>100</div>
            <div className="text-3xl font-semibold">
              <BsHandThumbsUp />
            </div>
            <div className="text-xxs w-1/3">
              Like this comment if you found it useful.
            </div>
          </div>
        </div>
        <div className="text-xs italic">"{review.content}"</div>
      </div>
    </div>
  ));
  //Passing of data from Firebase

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="flex justify-evenly flex-wrap w-screen">
        <div className="text-left">
          <p className="text-orange text-xl font-semibold drop-shadow-lg">
            {dishSelected.val.dishName}
          </p>
          <p className="text-orange text-xxs italic font-semibold">
            by {dishSelected.val.stallName}
          </p>
          <p className="text-orange text-xxs italic font-semibold">Location</p>
        </div>
        <div className="flex flex-wrap justify-start space-x-2 mt-0.5 text-purple">
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
        <img
          src={dishSelected.val.photoURLs[0]}
          alt="dish"
          className="p-4 rounded-3xl drop-shadow-xl"
        />
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          <p className="text-purple text-xl font-semibold drop-shadow-lg">
            Photos
          </p>
          {dishPhotos}
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          <p className="text-xl font-semibold drop-shadow-lg">Description</p>
          <p className="text-lg font-semibold pt-4">Story</p>
          <p className="text-xxs lg:text-sm pt-4">{dishSelected.val.story}</p>
          <p className="text-lg font-semibold pt-4">Contains</p>
          <p className="text-green text-sm lg:text-sm pt-4">
            {dishIngredients}
          </p>
          <p className="text-lg font-semibold pt-4">Attributes</p>
          <p className="text-green text-sm lg:text-sm pt-4">{dishAttributes}</p>
          <p className="text-lg font-semibold mb-3 pt-4">
            Wanna know more about the stall?
          </p>
          <Link to="/stall">
            <Button>Visit Stall!</Button>
          </Link>
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
          <p className="text-xl font-semibold drop-shadow-lg">Order</p>
          <FormOrder />
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
          <p className="text-xl font-semibold drop-shadow-lg">Add A Review</p>
          {/* Need conditional rendering after checking whether past history - user has ordered this dish */}
          <FormReview />
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
          <p className="text-xl font-semibold drop-shadow-lg mb-4">Reviews</p>
          <div className="overflow-scroll h-[32rem]">{reviewList}</div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
