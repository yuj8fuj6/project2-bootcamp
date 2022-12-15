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

  useEffect(() => {
    const db = getDatabase();
    const reviewArr = [];
    const reviewData = query(databaseRef(db, `reviews/`), orderByChild(`user`));
    onChildAdded(reviewData, (snapshot) => {
      // console.log(snapshot.val())
      const currentReview = snapshot.val();
      const currentReviewKey = snapshot.key;
      reviewArr.push({ ...currentReview, currentReviewKey });
      setReviewData(reviewArr);
    });
  }, []);

  console.log(reviewData);

  return (
    <ReviewContext.Provider value={reviewData}>
      {props.children}
    </ReviewContext.Provider>
  );
};
