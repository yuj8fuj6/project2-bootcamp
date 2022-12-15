import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { HawkerContext } from "../contexts/HawkerContext";
import { Carousel } from "antd";
import { ReviewContext } from "../contexts/ReviewContext";

const contentStyle = {
  fontFamily: "Sansita",
};

const StallCarousel = () => {
  const [randomStall, setRandomStall] = useState();

  const stallData = useContext(HawkerContext);
  const reviewData = useContext(ReviewContext);

  const randomizeStall = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const stallSelect = randomizeStall(stallData).slice(0, 5);

  useEffect(() => {
    if (stallData) {
      setRandomStall(stallSelect);
    }
  }, [stallData]);

  return (
    <div className="w-full">
      <Carousel autoplay>
        {randomStall &&
          randomStall.map((stall) => (
            <div>
              <h3 style={contentStyle}>
                <div className="text-center relative h-full w-full lg:h-1/2 snap-start">
                  <div className="h-full w-full block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
                    <img
                      src={stall.stallFrontPhotoURL}
                      alt="Hawker"
                      className="w-full aspect-4/3"
                    />
                  </div>
                  <div className="h-full w-full aspect-4/3 block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-main-bg/75 z-10">
                    <div className="text-purple py-1 px-8 mx-auto text-xxs text-left lg:space-y-10">
                      <h1 className="text-2xl font-bold lg:text-5xl">
                        {stall.stallName}
                      </h1>
                      <h2 className="font-semibold lg:text-3xl">
                        {stall.foodCenterName}
                      </h2>
                      <div className="font-semibold lg:text-2xl">
                        <p>
                          Opening Hrs: {stall.peningDays}, {stall.openingHours}
                        </p>
                        <p>Owner: {stall.ownerName} </p>

                        <p>Started in {stall.startingYear}</p>
                      </div>
                      <p className="lg:text-2xl">
                        <span className="font-semibold lg:text-2xl">
                          From the Owner:{" "}
                        </span>
                        “{stall.stallStory}”
                      </p>
                      <div className="flex flex-wrap justify-start space-x-5 mt-0.5">
                        <div className="text-2xl font-semibold">
                          <BsHandThumbsUp />
                          <div className="text-xxs">Total Likes</div>
                        </div>
                        <div className="text-2xl font-semibold">200</div>
                        <div className="text-2xl font-semibold">
                          <BsChatLeftText />
                          <div className="text-xxs">Total Reviews</div>
                        </div>
                        <div className="text-2xl font-semibold">200</div>
                      </div>
                    </div>
                    <Link to="/stall" state={stall}>
                      <Button>Visit Stall!</Button>
                    </Link>
                  </div>
                </div>
              </h3>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default StallCarousel;
