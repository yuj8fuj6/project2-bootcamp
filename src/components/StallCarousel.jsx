import React, { useState, useRef, useEffect } from "react";

const StallCarousel = () => {
  return (
    <div className="my-12 mx-auto">
      <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
        Our epic carousel
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          ...buttons
        </div>
      </div>
    </div>
  );
};

export default StallCarousel;
