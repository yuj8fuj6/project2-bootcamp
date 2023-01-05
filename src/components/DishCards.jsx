import React, { useState, useContext } from "react";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DishContext } from "../contexts/DishContext";
import { ReviewContext } from "../contexts/ReviewContext";

const DishCards = () => {
  const [filter, setFilter] = useState([]);
  const [filterState, setFilterState] = useState(false);

  const dishes = useContext(DishContext);
  const { reviewObj } = useContext(ReviewContext);

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      setFilter(dishes);
    }
    const resultsArray = dishes.filter(
      (dish) =>
        dish.dishName.toLowerCase().includes(e.target.value) ||
        dish.stallName.toLowerCase().includes(e.target.value)
    );
    setFilter([...resultsArray]);
    setFilterState(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const likeCount = (dishIndex) => {
    let likeCount = dishes[dishIndex].totalLikes;
    return <div className="text-2xl font-semibold">{likeCount}</div>;
  };

  const reviewCount = (dishKey) => {
    let count = 0;

    if (reviewObj[dishKey]) {
      count = Object.keys(reviewObj[dishKey]).length;
      return <div className="text-2xl font-semibold">{count}</div>;
    } else {
      return <div className="text-2xl font-semibold">{count}</div>;
    }
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
            {/* I assume this is some icon? I think these could be made their own components */}
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
          dishes.map((item, index) => {
            return (
              <Link to="dish" state={item}>
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
                      "{item.story}"{/* To place last review here */}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-start space-x-12 mx-5 text-purple">
                    <div className="text-3xl font-semibold">
                      <BsHandThumbsUp />
                      <div className="text-xxs">Total Likes</div>
                    </div>
                    {likeCount(index)}
                    <div className="text-3xl font-semibold">
                      <BsChatLeftText />
                      <div className="text-xxs">Total Reviews</div>
                    </div>
                    {reviewCount(item.currentDishKey)}
                  </div>
                </div>{" "}
              </Link>
            );
          })}
        {dishes &&
          filterState &&
          filter.map((item, index) => (
            <Link to="dish" state={item}>
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
                    "{item.story}"{/* To place last review here */}
                  </p>
                </div>
                <div className="flex flex-wrap justify-start space-x-12 mx-5 text-purple">
                  <div className="text-3xl font-semibold">
                    <BsHandThumbsUp />
                    <div className="text-xxs">Total Likes</div>
                  </div>
                  {likeCount(index)}
                  <div className="text-3xl font-semibold">
                    <BsChatLeftText />
                    <div className="text-xxs">Total Reviews</div>
                  </div>
                  {reviewCount(item.currentDishKey)}
                </div>
              </div>{" "}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DishCards;
