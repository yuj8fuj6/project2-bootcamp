import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { OrderContext } from "../contexts/OrderContext";

const OrderCards = () => {
  const orders = useContext(OrderContext);

  const user = useContext(UserContext);

  const ordersFiltered = orders.filter((order) => order.userID === user.uid);

  return (
    <div className="border-t-1 border-purple mx-10 mt-5">
      <div className="text-xl text-purple font-bold drop-shadow-xl text-left mt-5">
        Order History
      </div>
      <div className="flex flex-wrap justify-around text-purple mt-5">
        {ordersFiltered.map((order) => (
          <div className="shadow-xl border-1 rounded-2xl p-3 mt-1 mb-1 m-4 flex flex-wrap">
            <img src={order.image} className="rounded-xl w-1/3 m-2" />
            <div className="grid grid-cols-1 text-left">
              <p className="text-xs font-normal">{order.stallName}</p>
              <div className="flex flex-wrap justify-around space-x-4">
                <p className="text-xl font-semibold">{order.qty} x </p>
                <p className="text-xs font-semibold">{order.dishName}</p>
                <p className="text-xs font-normal">{order.option}</p>
                <p className="text-xs font-semibold">SGD $ {order.cost}</p>
              </div>
              <p className="text-xs font-normal">
                Dish Ordered on: <br></br>
                {order.orderTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCards;
