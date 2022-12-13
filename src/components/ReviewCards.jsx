import React, { useState, useEffect, useContext } from "react";
import {
  BsHandThumbsUp,
  BsChatLeftText,
  BsHandThumbsUpFill,
} from "react-icons/bs";

const ReviewCards = () => {
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

  return (
    <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
      <p className="text-xl font-semibold drop-shadow-lg mb-4">Reviews</p>
      <div className="overflow-scroll h-[32rem]">{reviewList}</div>
    </div>
  );
};

export default ReviewCards;
