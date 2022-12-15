import React from "react";

export default function Card(props){

  const handleClick = () =>{
    alert("nigger")
  }

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg" onClick={handleClick}>
      <img
        class="w-full"
        src="/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{props.stallName}</div>
        <img src={props.stallImage} alt="test" />
        <p class="text-gray-700 text-base">{props.stallStory}</p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}