import React from "react";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { Link } from "react-router-dom";

const StallDishCards = (props) => {
  const dishData = props.dishFiltered;
  // console.log(dishData);

  return (
    <>
      <div className="flex justify-evenly flex-wrap sm:flex-1 overflow-auto h-[32rem]">
        {dishData.map((items, key) => (
          <Link to="/dish" state={items}>
            <div
              className="w-full rounded-lg shadow-md lg:max-w-sm hover:bg-orange/90 hover:opacity-75"
              key={key}
            >
              <img
                className="object-cover w-full h-72 p-2 rounded-2xl drop-shadow-xl"
                src={items.photoURLs}
                alt="dish-photo"
              />
              <div className="p-4 text-left">
                <h4 className="text-lg font-extrabold text-purple">
                  {items.dishName}
                </h4>
                <p className="mb-2 leading-normal text-sm font-medium text-purple italic ">
                  SGD 4.50
                </p>
              </div>
              <div className="flex flex-wrap justify-start space-x-10 mx-5 text-purple">
                <div className="text-3xl font-semibold">
                  <BsHandThumbsUp />
                  <div className="text-xxs">Total Likes</div>
                </div>
                <div className="text-2xl font-semibold">200</div>
                <div className="text-3xl font-semibold">
                  <BsChatLeftText />
                  <div className="text-xxs">Total Reviews</div>
                </div>
                <div className="text-2xl font-semibold">200</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default StallDishCards;
