import React, { createContext, useState, useEffect } from "react";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onChildAdded,
} from "firebase/database";

export const ReviewContext = createContext();

export const ReviewContextProvider = (props) => {
  const [reviewData, setReviewData] = useState([]);
  const [reviewObj, setReviewObj] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const reviewArr = [];
    const review = {};
    const reviewData = query(databaseRef(db, `reviews`), orderByChild(`user`));
    onChildAdded(reviewData, (snapshot) => {
      const currentReview = snapshot.val();
      const currentReviewKey = snapshot.key;
      reviewArr.push({ ...currentReview, currentReviewKey });
      setReviewData(reviewArr);

      review[`${currentReviewKey}`] = currentReview;
      setReviewObj({ ...reviewObj, ...review });
    });
  }, []);

  return (
    <ReviewContext.Provider value={{ reviewData, reviewObj }}>
      {props.children}
    </ReviewContext.Provider>
  );
};
