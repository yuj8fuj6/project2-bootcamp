import React, { useState, useContext, useEffect } from "react";
import { ButtonDisabled } from "../components";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { database } from "../firebase";
import { ref as databaseRef, getDatabase, update } from "firebase/database";

const FormReview = (props) => {
  const user = props.user;
  console.log(user);
  const dish = props.dish;
  console.log(dish);
  const stall = props.stall;
  console.log(stall);

  const [review, setReview] = useState("");

  const [finalReview, setFinalReview] = useState({});
  const [like, setLike] = useState(false);

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleLike = () => {
    setLike(true);
    if (like) {
      setLike(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFinalReview([...finalReview, review]);
    setReview({ likeCount: 1, review: "" });

    // First add review to database - review, timestamp, dishID, dishName, stallName, userID, hawkerID, userImage, userName, like
    // For the likes - ill update the realtime DB using the update method - hawker - likes, dish - likes.
  };

  // console.log(review)
  // console.log(finalReview)

  return (
    <div className="text-left text-purple text-lg font-bold border-2 rounded-xl shadow-lg p-2 mt-2">
      <p>You have eaten this dish before!</p>
      <p className="text-sm font-normal mt-4">
        If you liked this dish and wish to support your favourite hawker, while
        earning Karma points, please leave a like and a review!
      </p>
      <div className=" flex flex-wrap text-3xl font-semibold mt-4">
        <button onClick={handleLike}>
          {like ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        </button>
        <span className="text-sm indent-4 font-normal">
          Like this dish to leave a review
        </span>
      </div>
      <form className="grid grid-cols-1 justify-start mt-4">
        <label className="text-lg">Review: </label>
        <textarea
          className="border-2 rounded-xl text-sm py-6 mt-2"
          type="text"
          id="review"
          required
          placeholder="Fill here"
          value={review.review}
          onChange={handleReview}
          name="review"
          disabled={!like}
          maxLength="200"
        ></textarea>
      </form>
      <div className="flex justify-center m-3">
        <ButtonDisabled onClick={handleSubmit} user={user}>
          Submit
        </ButtonDisabled>
      </div>
    </div>
  );
};

export default FormReview;
