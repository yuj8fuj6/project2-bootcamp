import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";

const StallCarousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

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
          <div className="carousel-item text-center relative h-72 w-full snap-start">
            <div className="h-full w-full aspect-4/3 block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
              <img
                src="/SampleHawkerPhotos/Balestier-Road-Hoover-Rojak-storefront.jpg"
                alt="Hawker"
                className="w-full aspect-4/3"
              />
            </div>
            <div className="h-full w-full aspect-4/3 block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-main-bg/75 z-10">
              <div className="text-purple py-1 px-8 mx-auto text-xxs text-left">
                <h1 className="text-3xl font-bold">Fu Zhou Ban Mian</h1>
                <h2 className="text-xl font-semibold">
                  Holland Village Market & Food Centre
                </h2>
                <div className="font-semibold">
                  <p>Opening Hrs: 10:00 am - 10:00 pm</p>
                  <p>Owner: Mr. Tan and Family </p>
                  <p>Started in 1980</p>
                </div>
                <p>
                  <span className="font-semibold">From the Owner: </span>“I
                  opened this stall at Holland Village Market & Food Centre
                  selling ban mian, which was based on my mother’s receipe. My
                  mother had brought over this knowledge from Fuzhou, China,
                  when she immigrated to Singapore in the 1930s. Recently, I
                  have gradually handed over the stall to my daughter, Everlyn
                  who is still learning the ropes of the trade. Please offer her
                  your support!” -Sample Text
                </p>
                <div className="flex flex-wrap justify-start space-x-12 mt-0.5">
                  <div className="text-2xl font-semibold">
                    <BsHandThumbsUp />
                    <div className="text-xxs">Total Likes</div>
                  </div>
                  <div className="text-2xl font-semibold">
                    <BsChatLeftText />
                    <div className="text-xxs">Total Reviews</div>
                  </div>
                </div>
              </div>
              <Link to="/stall">
                <Button>Visit Stall!</Button>
              </Link>
            </div>
          </div>
          <div className="carousel-item text-center relative h-72 w-full snap-start">
            <div className="h-full w-full aspect-4/3 block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
              <img
                src="/SampleHawkerPhotos/beach-road-prawn-noodle-house-storefront.jpg"
                alt="Hawker"
                className="w-full aspect-4/3"
              />
            </div>
            <div className="h-full w-full aspect-4/3 block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-main-bg/75 z-10">
              <div className="text-purple py-1 px-8 mx-auto text-xxs text-left">
                <h1 className="text-3xl font-bold">Fu Zhou Ban Mian</h1>
                <h2 className="text-xl font-semibold">
                  Holland Village Market & Food Centre
                </h2>
                <div className="font-semibold">
                  <p>Opening Hrs: 10:00 am - 10:00 pm</p>
                  <p>Owner: Mr. Tan and Family </p>
                  <p>Started in 1980</p>
                </div>
                <p>
                  <span className="font-semibold">From the Owner: </span>“I
                  opened this stall at Holland Village Market & Food Centre
                  selling ban mian, which was based on my mother’s receipe. My
                  mother had brought over this knowledge from Fuzhou, China,
                  when she immigrated to Singapore in the 1930s. Recently, I
                  have gradually handed over the stall to my daughter, Everlyn
                  who is still learning the ropes of the trade. Please offer her
                  your support!” -Sample Text
                </p>
                <div className="flex flex-wrap justify-start space-x-12 mt-0.5">
                  <div className="text-2xl font-semibold">
                    <BsHandThumbsUp />
                    <div className="text-xxs">Total Likes</div>
                  </div>
                  <div className="text-2xl font-semibold">
                    <BsChatLeftText />
                    <div className="text-xxs">Total Reviews</div>
                  </div>
                </div>
              </div>
              <Link to="/stall">
                <Button>Visit Stall!</Button>
              </Link>
            </div>
          </div>
          <div className="carousel-item text-center relative h-72 w-full snap-start">
            <div className="h-full w-full aspect-4/3 block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0">
              <img
                src="/SampleHawkerPhotos/cendol-geylang-serai-storefront.jpg"
                alt="Hawker"
                className="w-full aspect-4/3"
              />
            </div>
            <div className="h-full w-full aspect-4/3 block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-main-bg/75 z-10">
              <div className="text-purple py-1 px-8 mx-auto text-xxs text-left">
                <h1 className="text-3xl font-bold">Fu Zhou Ban Mian</h1>
                <h2 className="text-xl font-semibold">
                  Holland Village Market & Food Centre
                </h2>
                <div className="font-semibold">
                  <p>Opening Hrs: 10:00 am - 10:00 pm</p>
                  <p>Owner: Mr. Tan and Family </p>
                  <p>Started in 1980</p>
                </div>
                <p>
                  <span className="font-semibold">From the Owner: </span>“I
                  opened this stall at Holland Village Market & Food Centre
                  selling ban mian, which was based on my mother’s receipe. My
                  mother had brought over this knowledge from Fuzhou, China,
                  when she immigrated to Singapore in the 1930s. Recently, I
                  have gradually handed over the stall to my daughter, Everlyn
                  who is still learning the ropes of the trade. Please offer her
                  your support!” -Sample Text
                </p>
                <div className="flex flex-wrap justify-start space-x-12 mt-0.5">
                  <div className="text-2xl font-semibold">
                    <BsHandThumbsUp />
                    <div className="text-xxs">Total Likes</div>
                  </div>
                  <div className="text-2xl font-semibold">
                    <BsChatLeftText />
                    <div className="text-xxs">Total Reviews</div>
                  </div>
                </div>
              </div>
              <Link to="/stall">
                <Button>Visit Stall!</Button>
              </Link>
            </div>
          </div>

          {/* {data.resources.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item text-center relative w-64 h-64 snap-start"
              >
                <a
                  href={resource.link}
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${resource.imageUrl || ""})` }}
                >
                  <img
                    src={resource.imageUrl || ""}
                    alt={resource.title}
                    className="w-full aspect-square hidden"
                  />
                </a>
                <a
                  href={resource.link}
                  className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {resource.title}
                  </h3>
                </a>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default StallCarousel;
