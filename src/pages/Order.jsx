import React, {useContext} from "react";
import { Header, NavBar, Button } from "../components";
import { DishContext } from "../contexts/DishContext";

const Order = (props) => {
  // Need data from DB for order made, and order history.

  const dishData = useContext(DishContext);

  const dishSelected = dishData[0];

  // Dummy data needs to be deleted later.
  const order = [
    {
      orderID: 1,
      dish: dishSelected.val.dishName,
      option: "Takeaway",
      qty: 2,
      cost: 9,
      time: "14:00",
      image: dishSelected.val.photoURLs[0],
      stallName: dishSelected.val.stallName,
    },
    {
      orderID: 2,
      dish: dishSelected.val.dishName,
      option: "Takeaway",
      qty: 2,
      cost: 9,
      time: "14:00",
      image: dishSelected.val.photoURLs[0],
      stallName: dishSelected.val.stallName,
    },
    {
      orderID: 1,
      dish: dishSelected.val.dishName,
      option: "Takeaway",
      qty: 2,
      cost: 9,
      time: "14:00",
      image: dishSelected.val.photoURLs[0],
      stallName: dishSelected.val.stallName,
    },
  ];

  let totalCost = 0;

  for (let i = 0; i < order.length; i++) {
    totalCost += order[i].cost;
  }

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
      <div className="mt-5 text-purple">
        {order.map((item) => (
          <div className="shadow-xl border-1 rounded-2xl p-3 mt-3 mb-1 m-4 flex flex-wrap space-y-2">
            <img src={item.image} className="rounded-xl w-1/3 m-2" />
            <div className="grid grid-cols-1 text-left">
              <p className="text-xs font-normal">{item.stallName}</p>
              <div className="flex flex-wrap justify-around">
                <p className="text-xl font-semibold">{item.qty} x </p>
                <p className="text-xs font-semibold">{item.dish}</p>
                <p className="text-xs font-normal">{item.option}</p>
                <p className="text-xs font-semibold">SGD $ {item.cost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="shadow-xl border-1 rounded-2xl p-3 mt-3 mb-1 m-4 grid grid-col-1 text-purple">
        <div className="flex flex-wrap justify-around">
          <p className="text-lg font-semibold">Order Total</p>
          <p className="text-lg font-semibold">SGD $ {totalCost}</p>
        </div>
        <div className="mt-4">
          <Button>Checkout</Button>
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
