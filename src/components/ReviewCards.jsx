import React, { useState, useEffect, useContext } from "react";
import {
  BsHandThumbsUp,
  BsChatLeftText,
  BsHandThumbsUpFill,
} from "react-icons/bs";
import { UserContext } from "../App";
import { ReviewContext } from "../contexts/ReviewContext";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref as databaseRef,
  runTransaction,
} from "firebase/database";

const ReviewList = ({ review }) => {
  const [url, setURL] = useState();
  const [like, setLike] = useState(false);
  const user = useContext(UserContext);
  const [currentUserKey, setCurrentUserKey] = useState();
  const [currentReview, setCurrentReview] = useState(review);

  const dbRef = databaseRef(getDatabase());

  const dateTime = new Date(currentReview.date).toLocaleString("en-GB", {
    timeStyle: "long",
    dateStyle: "medium",
  });
  console.log(dateTime);

  useEffect(() => {
    if (!user) {
      setCurrentUserKey(null);
    } else {
      setCurrentUserKey(user.uid);
      const db = getDatabase();
      onValue(
        databaseRef(
          db,
          `reviews/${currentReview.dishID}/${currentReview.userID}/likers/${currentUserKey}`
        ),
        (snapshot) => {
          if (snapshot.exists()) {
            setLike(true);
          } else {
            setLike(false);
          }
        }
      );
    }
  }, []);

  get(child(dbRef, `users/${review.userID}/profilePhoto`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setURL(snapshot.val());
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const handleLike = () => {
    if (!user) {
      return alert("Log in first to like posts");
    }

    setLike(!like);
    const reviewerKey = user.uid;

    const reviewRef = databaseRef(
      getDatabase(),
      `/reviews/${review.dishID}/${review.userID}/`
    );

    runTransaction(reviewRef, (post) => {
      if (post) {
        if (post.likers && post.likers[`${reviewerKey}`]) {
          post.likes--;
          post.likers[`${reviewerKey}`] = null;
        } else {
          post.likes++;
          if (!post.likers) {
            post.likers = {};
          }
          post.likers[`${reviewerKey}`] = true;
        }
        setCurrentReview(post);
      }
      return post;
    });
  };

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
            {currentReview.firstName} -{" "}
            <span className="italic">{currentReview.usertype}</span>
          </p>
          <p className="font-normal">{dateTime}</p>
        </div>
        <div>
          <div className="flex flex-wrap justify-start space-x-2 mt-2 text-purple">
            <div className="text-3xl font-semibold">
              {like ? (
                <button type="button" onClick={handleLike}>
                  <BsHandThumbsUpFill />
                </button>
              ) : (
                <button type="button" onClick={handleLike}>
                  <BsHandThumbsUp />
                </button>
              )}
              <div>{currentReview.likes}</div>
              <div className="text-xxs">Likes</div>
            </div>
          </div>
        </div>
        <div className="text-xs italic">"{currentReview.content}"</div>
      </div>
    </div>
  );
};

const ReviewCards = ({ currentDish }) => {
  const { reviewObj } = useContext(ReviewContext);
  const { currentDishKey } = currentDish;

  const dishReviewsList = Object.values(reviewObj[currentDishKey]);

  return (
    <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
      <p className="text-xl font-semibold drop-shadow-lg mb-4">Reviews</p>
      <div className="overflow-scroll h-[32rem]">
        {dishReviewsList.map((review) => (
          <ReviewList review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCards;
