import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { DishContext } from "../contexts/DishContext";

export default function Card(props){
  let navigate = useNavigate();
  const dishData = useContext(DishContext);
  const dishFiltered = dishData.filter(
    (dish) => dish.hawkerKey === props.stall.currentHawkerKey
  );
  console.log(dishFiltered);
  const handleClick = () =>{
    navigate("/stall", {state: props.stall});
  }

  return (
    <div
      className="center "
      class=" overflow-hidden shadow-lg"
      onClick={handleClick}
    >
      <div class="px-6 py-4 center border-1 bg-orange rounded-2xl card border-purple hover:opacity-75">
        <div class="text-purple font-bold text-xl mb-2">
          {props.stall.stallName}
        </div>
        <img
          className="w-11/12"
          src={props.stall.stallFrontPhotoURL}
          alt="test"
        />
        <div className="border-t-1 w-11/12 border-purple text-white text-left">
          <div className="shadow-xl border-1 bg-purple border-inherit rounded-2xl p-3 mt-1 mb-1">
            <p className="text-xl font-semibold drop-shadow-lg">Description</p>
            <p className="text-xs lg:text-sm font-bold underline mt-2">
              Location
            </p>
            <p className="text-xs lg:text-sm mt-2">
              {props.stall.stallAddress}
            </p>
            <p className="text-xs lg:text-sm font-bold underline mt-2">
              Opening Hours
            </p>
            <p className="text-xs lg:text-sm mt-2">
              {props.stall.openingHours}
            </p>
            <p className="text-xs lg:text-sm font-bold underline mt-2">
              Dishes Available:
            </p>
            <p className="text-xs lg:text-sm mt-2">
              {dishFiltered.map((dish, i) => (
                <div>{`Dish ${i + 1}: ${dish.dishName}`}</div>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2"></div>
    </div>
  );
}