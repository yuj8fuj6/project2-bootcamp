import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { HawkerContext } from "../contexts/HawkerContext";

const StallCarousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const [randomStall, setRandomStall] = useState();

  const stallData = useContext(HawkerContext);

  console.log(stallData);
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

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
  console.log(stallSelect);

  useEffect(() => {
    if (stallData) {
      setRandomStall(stallSelect);
      // console.log(randomStall);
    }
  }, [stallData]);

  console.log(randomStall);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-secondary-orange-bg/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-secondary-orange-bg/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {randomStall &&
            randomStall.map((stall) => {
              return (
                <div className="carousel-item text-center relative h-72 w-full snap-start">
                  <div className="h-full w-full aspect-4/3 block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
                    <img
                      src={stall.val.stallFrontPhotoURL}
                      alt="Hawker"
                      className="w-full aspect-4/3"
                    />
                  </div>
                  {console.log("Hello")}
                  <div className="h-full w-full aspect-4/3 block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-main-bg/75 z-10">
                    <div className="text-purple py-1 px-8 mx-auto text-xxs text-left">
                      <h1 className="text-3xl font-bold">
                        {stall.val.stallName}
                      </h1>
                      <h2 className="text-xl font-semibold">
                        {stall.val.foodCenterName}
                      </h2>
                      <div className="font-semibold">
                        <p>
                          Opening Hrs: {stall.val.openingDays},{" "}
                          {stall.val.openingHours}
                        </p>
                        <p>Owner: Mr. Tan and Family </p>
                        {/* Need Owner name in seeded data and form */}
                        <p>Started in 1980</p>
                        {/* Need starting year for stall */}
                      </div>
                      <p>
                        <span className="font-semibold">From the Owner: </span>“
                        {stall.val.stallStory}”
                      </p>
                      <div className="flex flex-wrap justify-start space-x-12 mt-0.5">
                        <div className="text-2xl font-semibold">
                          <BsHandThumbsUp />
                          <div className="text-xxs">Total Likes</div>
                          {/* Need passing of data for total likes */}
                        </div>
                        <div className="text-2xl font-semibold">
                          <BsChatLeftText />
                          <div className="text-xxs">Total Reviews</div>
                          {/* Need passing of data for total reviews */}
                        </div>
                      </div>
                    </div>
                    <Link to="/stall" value={stall.val.userKey}>
                      <Button>Visit Stall!</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StallCarousel;
