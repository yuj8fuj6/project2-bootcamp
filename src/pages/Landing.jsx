import React from "react";
import { Header, NavBar, StallCarousel, SearchFunction } from "../components";

const Landing = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="2xl:container 2xl:mx-auto 2xl:px-0">
        <StallCarousel />
      </div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <p className="text-orange text-xl font-semibold drop-shadow-lg">
          Community Reviews
        </p>
        <SearchFunction />
      </div>
      <div>Dish Cards</div>
    </div>
  );
};

export default Landing;
