import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card(props){
    let navigate = useNavigate();

  const handleClick = () =>{
    navigate("/stall", {state: props.stall});
  }

  return (
    <div className="center"
      class="max-w-sm rounded overflow-hidden shadow-lg"
      onClick={handleClick}
    >
      <div class="px-6 py-4 center">
        <div class="text-purple font-bold text-xl mb-2">
          {props.stall.stallName}
        </div>
        <img src={props.stall.stallFrontPhotoURL} alt="test" />
        <p class="text-purple text-base">{props.stall.stallStory}</p>
      </div>
      <div class="px-6 pt-4 pb-2"></div>
    </div>
  );
}