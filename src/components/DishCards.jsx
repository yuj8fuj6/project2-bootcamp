import React, { useState, useEffect, useContext } from "react";
import { useCallback } from "react";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onValue,
} from "firebase/database";

const DishCards = () => {
  const [dishes, setDishes] = useState();
  const [dishDetails, setDishDetails] = useState(null);

  const fetchDishDetails = useCallback(() => {
    const db = getDatabase();
    const dishData = query(databaseRef(db, `dishes`), orderByChild(`dishName`));
    onValue(dishData, (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const [...dishes] = Object.values(snapshot.val());
        setDishDetails(dishes);
      }
    });
  }, [dishes]);

  useEffect(() => {
    fetchDishDetails();
  }, [dishes]);

  console.log(dishDetails);

  return (
    <>
      <div className="flex justify-evenly flex-wrap sm:flex-1 overflow-auto h-[32rem]">
        {dishDetails &&
          dishDetails.map((item) => (
            <Link to="dish">
              <div className="w-full rounded-lg shadow-md lg:max-w-sm hover:bg-orange/90 hover:opacity-75">
                <img
                  className="object-cover w-full h-72 p-2 rounded-2xl drop-shadow-xl"
                  src={item.photoURLs[0]}
                  alt="dish-photo"
                />
                <div className="p-4 text-left">
                  <h4 className="text-lg font-extrabold text-purple">
                    {item.dishName}
                  </h4>
                  <h5 className="text-sm font-extrabold text-purple">
                    {item.stallName}
                  </h5>
                  <p className="mb-2 leading-normal text-sm font-medium text-purple italic ">
                    {item.story}
                    {/* To place last review here */}
                  </p>
                </div>
                <div className="flex flex-wrap justify-start space-x-12 mx-5">
                  <div className="text-3xl font-semibold text-purple">
                    <BsHandThumbsUp />
                    <div className="text-xxs">Total Likes</div>
                  </div>
                  <div className="text-3xl font-semibold text-purple">
                    <BsChatLeftText />
                    <div className="text-xxs">Total Reviews</div>
                  </div>
                </div>
              </div>{" "}
            </Link>
          ))}
      </div>
    </>
  );
};

export default DishCards;
