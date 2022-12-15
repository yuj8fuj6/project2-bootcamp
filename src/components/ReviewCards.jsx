import React, { useState, useEffect, useContext } from "react";
import {
  BsHandThumbsUp,
  BsChatLeftText,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import { UserContext } from "../App";
import { ReviewContext } from "../contexts/ReviewContext";
import { child, get, getDatabase, ref as databaseRef } from "firebase/database";
import { database } from "../firebase";

const getUserProfilePhoto = (userKey) => {
  const url = "";
  console.log("hello");
  const dbRef = databaseRef(getDatabase());
  get(child(dbRef, `users/${userKey}/profilePhoto`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        url = snapshot.val();
      } else console.log("no photo");
    })
    .catch((error) => {
      console.error(error);
    });

  return url;
};

const ReviewList = ({ review }) => {
  console.log(review.userID);

  const [url, setURL] = useState();

  const dbRef = databaseRef(getDatabase());
  get(child(dbRef, `users/${review.userID}/profilePhoto`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setURL(snapshot.val());
      } else console.log("no photo");
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <div className="flex flex-wrap mb-3">
      {url ? (
        <img
          src={url}
          alt="profile"
          className="rounded-full drop-shadow-xl w-24 h-24 lg:w-48 lg:h-48 object-cover mt-4"
        />
      ) : (
        <div className="rounded-full drop-shadow-xl w-24 h-24 lg:w-48 lg:h-48 object-cover mt-4">
          <svg
            className="m-w-none h-auto"
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
      )}

      <div className="grid grid-cols-1 w-4/6 pl-4 mt-4">
        <div className="font-extrabold">
          <p>
            {review.firstName} -{" "}
            <span className="italic">{review.usertype}</span>
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
  );
};

const ReviewCards = ({ currentDish }) => {
  const { reviewObj } = useContext(ReviewContext);

  console.log(currentDish);
  console.log(reviewObj);

  const { currentDishKey } = currentDish;

  const dishReviewsList = Object.values(reviewObj[currentDishKey]);
  console.log(dishReviewsList);

  return (
    <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
      <p className="text-xl font-semibold drop-shadow-lg mb-4">Reviews</p>
      {/* <div className="overflow-scroll h-[32rem]">{reviewList}</div> */}
      <div className="overflow-scroll h-[32rem]">
        {dishReviewsList.map((review) => (
          <ReviewList review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCards;
