import React, { useState, useEffect } from "react";
import { ButtonDisabled } from "../components";
import { useNavigate } from "react-router-dom";

const FormOrder = (props) => {
  const user = props.user;
  // console.log(user);
  const dish = props.dish;
  // console.log(dish);
  const stall = props.stall;
  // console.log(stall);

  const dishPrice = 4.5;
  const dishName = "Curry Puff";

  const [order, setOrder] = useState({
    name: dishName,
    qty: 0,
    option: "",
    time: "",
    cost: 0,
  });
  const [fullOrder, setFullOrder] = useState([]);
  const [checked, setChecked] = useState({
    takeaway: false,
    consume: false,
  });

  const totalCost = order.qty * dishPrice;

  let navigate = useNavigate();

  useEffect(() => {
    setOrder({ ...order, cost: totalCost });
  }, [totalCost]);

  const handleOrder = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setFullOrder([...fullOrder, order]);
    // Need to push dishID in this order.
    setOrder({});
    navigate("/order");
  };

  const changeOption = (e) => {
    setChecked({ [e.target.value]: true });
  };

  // console.log(order);
  // console.log(fullOrder);

  return (
    <div className="text-left text-purple text-lg font-bold border-2 rounded-xl shadow-lg p-2 mt-2">
      <p className="font-black">
        $ {dishPrice} SGD <span className="font-normal">per bowl</span>
      </p>
      <form className="grid grid-cols-1 justify-start mt-2">
        <label className="text-lg">Qty: </label>
        <input
          className="bg-neutral-200 rounded-xl text-lg ml-3 indent-3 w-1/2"
          type="number"
          id="qty"
          required
          placeholder="1"
          value={order.qty}
          onChange={handleOrder}
          name="qty"
        ></input>
        <fieldset className="mt-4">
          <legend>Choose meal option: </legend>
          <div>
            <div>
              <input
                type="radio"
                id="takeaway"
                value="takeaway"
                checked={checked.takeaway}
                onChange={handleOrder}
                onClick={changeOption}
                name="option"
              />
              <label for="takeaway" className="font-normal text-sm pl-3">
                Takeaway (Pick from stall)
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="consume"
                value="consume"
                checked={checked.consume}
                onChange={handleOrder}
                onClick={changeOption}
                name="option"
              />
              <label for="consume" className="font-normal text-sm pl-3">
                Consume at Hawker Centre
              </label>
            </div>
          </div>
        </fieldset>
        <label className="text-lg mt-4">
          Time of Pick-Up (Only for Today):{" "}
        </label>
        <input
          className="bg-neutral-200 rounded-xl text-lg ml-3 indent-3 w-1/2"
          type="time"
          id="time"
          required
          value={order.time}
          onChange={handleOrder}
          name="time"
        ></input>
      </form>
      <div className="border-t-1 w-11/12 border-purple mt-4 pt-4">
        Total:{" "}
        <span className="bg-neutral-200 rounded-full px-5 py-1">
          {order.cost ? order.cost : 0.0}
        </span>{" "}
        SGD
      </div>
      <div className="text-sm mt-4 ">
        If you have confirmed the above, please proceed to order:
      </div>
      <div className="flex justify-center m-3">
        <ButtonDisabled onClick={handleSubmit} user={user}>
          Order
        </ButtonDisabled>
      </div>
    </div>
  );
};

export default FormOrder;
