import React, { useState } from "react";
import { ButtonDisabled } from "../components";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const FormReview = (props) => {
  const user = props.user;
  console.log(user);
  const dish = props.dish;
  console.log(dish);
  const stall = props.stall;
  console.log(stall);

  const [review, setReview] = useState({
    likeCount: 1,
    review: "",
  });

  const [finalReview, setFinalReview] = useState([]);
  const [checked, setChecked] = useState({
    like: false,
  });
  // Like function to be passed into Firebase realtime storage
  // Conditional rendering of review component required after checking like

  const handleReview = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFinalReview([...finalReview, review]);
    setReview({ likeCount: 1, review: "" });
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
        <BsHandThumbsUp />
        <span className="text-sm indent-4 font-normal">
          Like this dish to leave a review
        </span>
      </div>
      <form className="grid grid-cols-1 justify-start mt-4">
        <label className="text-lg">Review: </label>
        <input
          className="border-2 rounded-xl text-sm indent-3 py-6 mt-2"
          type="text"
          id="review"
          required
          placeholder="Fill here"
          value={review.review}
          onChange={handleReview}
          name="review"
        ></input>
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
