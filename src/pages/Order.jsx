import React, { useEffect, useState } from "react";
import { Header, NavBar, Button } from "../components";
import { useLocation } from "react-router-dom";
import { database } from "../firebase";
import { ref as databaseRef, set, push } from "firebase/database";

const ORDER_DATABASE = "orders";

const Order = () => {
  const location = useLocation();
  const order = location.state;

  const {
    dishID,
    dishName,
    option,
    qty,
    cost,
    time,
    image,
    stallName,
    user,
    userPhone,
    hawkerPhone,
    userID,
  } = order;

  // console.log(hawkerPhone)

  const hawkerPhoneNumber = 6590719168;
  // To be dynamically programmed once hawker phone number is passed

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ordersListRef = databaseRef(database, ORDER_DATABASE);
    const newOrder = {
      dishID: dishID,
      dishName: dishName,
      qty: qty,
      cost: cost,
      time: time,
      option: option,
      stallName: stallName,
      user: user,
      userID: userID,
      image: image,
    };
    const newOrderRef = push(ordersListRef);
    set(newOrderRef, { ...newOrder, orderTime: Date() })
      .then(() => {
        window.location.href = `https://wa.me/${hawkerPhoneNumber}?text=${user}%20(Contact%20Number:%20${userPhone})%20has%20ordered%20${qty}%20nos.%20of%20${dishName}!%20Mode%20of%20Pick-up%20will%20be%20${option}.%20Expected%20time%20of%20Pick-up%20today%20-%20${time}.%20The%20payment%20of%20SGD%20${cost}%20will%20be%20made%20via%20PayNow%20before%20the%20pick-up.`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="text-left w-1/2 pl-7">
        <p className="text-orange text-xl font-semibold drop-shadow-lg">
          Order Summary
        </p>
      </div>
      <div className="text-left w-1/2 pl-7 mt-2">
        <p className="text-orange text-lg font-semibold drop-shadow-lg">
          Orderer: <span className="text-purple">{user}</span>
        </p>
      </div>
      <div className="mt-5 text-purple">
        <div className="shadow-xl border-1 rounded-2xl p-3 mt-3 mb-1 m-4 flex flex-wrap space-y-2">
          <img src={image} className="rounded-xl w-1/3 m-2" />
          <div className="grid grid-cols-1 text-left">
            <p className="text-xs font-normal">{stallName}</p>
            <div className="flex flex-wrap justify-around space-x-4">
              <p className="text-xl font-semibold">{qty} x </p>
              <p className="text-xs font-semibold">{dishName}</p>
              <p className="text-xs font-normal">{option}</p>
              <p className="text-xs font-semibold">SGD $ {cost}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-xl border-1 rounded-2xl p-3 mt-3 mb-1 m-4 grid grid-col-1 text-purple">
        <div className="flex flex-wrap justify-around">
          <p className="text-lg font-semibold">Order Total</p>
          <p className="text-lg font-semibold">SGD $ {cost}</p>
        </div>
        <div className="border-t-1 border-purple mt-5">
          <p className="text-left text-sm">
            Expected Time of Pick-Up Today:
            <span className="font-semibold"> {time}</span>
          </p>
        </div>
        <div className="mt-4">
          <Button onClick={handleSubmit}>Checkout</Button>
        </div>
        <div className="mt-4 text-xs text-left">
          <p>NOTE: </p>
          <p>
            Having checked your order and by pressing the checkout button, the
            details of your order will be sent via WhatsApp to the stallholder.
            Main payment methods are cash or PayNow.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
