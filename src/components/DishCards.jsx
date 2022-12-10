import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onChildAdded,
  onChildChanged,
} from "firebase/database";

const DishCards = () => {
  const [dishes, setDishes] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filterState, setFilterState] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const dishArr = [];
    const dishData = query(databaseRef(db, `dishes`), orderByChild(`dishName`));
    onChildAdded(dishData, (snapshot) => {
      const currentDish = snapshot.val();
      dishArr.push(currentDish);
      setDishes(dishArr);
    });
  }, []);

  console.log(dishes);

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      setFilter(dishes);
    }
    const resultsArray = dishes.filter(
      (dish) =>
        dish.dishName.toLowerCase().includes(e.target.value) ||
        dish.stallName.toLowerCase().includes(e.target.value),
    );
    setFilter([...resultsArray]);
    setFilterState(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="flex flex-wrap justify-around mb-2">
        <form className="flex space-x-1" onSubmit={handleSubmit}>
          <input
            type="text"
            className="block w-full px-4 py-2 bg-white border rounded-full focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            id="search"
            onChange={handleSearchChange}
          />
          <button className="px-4 text-white bg-orange rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="flex justify-evenly flex-wrap sm:flex-1 overflow-auto h-[32rem]">
        {dishes &&
          !filterState &&
          dishes.map((item) => (
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
        {dishes &&
          filterState &&
          filter.map((item) => (
            <Link to="dish">
              {/* Link to add to each dish using ID */}
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
    </div>
  );
};

export default DishCards;
