import React, { useState, useEffect, useContext } from "react";
import {
  Header,
  NavBar,
  Button,
  FormOrder,
  FormReview,
  ReviewCards,
} from "../components";
import { BsHandThumbsUp, BsChatLeftText } from "react-icons/bs";
import { useLocation, Link } from "react-router-dom";
import { HawkerContext } from "../contexts/HawkerContext";
import { UserContext } from "../App";
import { OrderContext } from "../contexts/OrderContext";
import { ReviewContext } from "../contexts/ReviewContext";
import { Modal } from "antd";

const Dish = () => {
  const location = useLocation();
  const dish = location.state;
  const user = useContext(UserContext);
  const stall = useContext(HawkerContext);
  const order = useContext(OrderContext);
  const [haveOrdered, setHaveOrdered] = useState(false);
  const { reviewObj } = useContext(ReviewContext);
  const [open, setOpen] = useState(false);

console.log(reviewObj)

  const showModal = () => {
    setOpen(true);
  };

  const stallFiltered = stall
    .filter((stall) => stall.currentHawkerKey === dish.hawkerKey)
    .pop();
  // console.log(stallFiltered);

  //Try to make image modal popup.
  const dishPhotos = dish.photoURLs.map((photoURL) => (
    <>
      <button onClick={showModal} className="w-1/3 m-1">
        <img src={photoURL} className="rounded-lg" />
      </button>
      <Modal
        open={open}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        centered
      >
        <img src={photoURL} className="m-1 rounded-lg" />
      </Modal>
    </>
  ));

  const dishIngredients = dish.ingredientList.map((item) => (
    <ul>
      <li>{item}</li>
    </ul>
  ));

  const dishAttributes = dish.attribute.map((item) => <>{item}, </>);

  let ordersFilteredByDish;

  useEffect(() => {
    if (user) {
      const ordersFiltered = order.filter((order) => order.userID === user.uid);
      ordersFilteredByDish = ordersFiltered
        .filter((order) => order.dishID === dish.currentDishKey)
        .pop();
    }
    if (ordersFilteredByDish) {
      setHaveOrdered(true);
    }
  }, []);

  const reviewCount = (dishKey) => {
    let count = 0;

    if (reviewObj[dishKey]) {
      count = Object.keys(reviewObj[dishKey]).length;
      return <div>{count}</div>;
    } else {
      return <div>{count}</div>;
    }
  };

  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div className="flex justify-evenly flex-wrap w-screen">
        <div className="text-left">
          <p className="text-orange text-xl font-semibold drop-shadow-lg">
            {dish.dishName}
          </p>
          <p className="text-orange text-xxs italic font-semibold">
            by {dish.stallName}
          </p>
          <p className="text-orange text-xxs italic font-semibold">
            {stallFiltered.foodCenterName}
          </p>
        </div>
        <div className="flex flex-wrap justify-start space-x-2 mt-0.5 text-purple">
          <div className="text-3xl font-semibold">
            <BsHandThumbsUp />
            <div className="text-xxs">Likes</div>
          </div>
          <div>{dish.totalLikes}</div>
          <div className="text-3xl font-semibold">
            <BsChatLeftText />
            <div className="text-xxs">Reviews</div>
          </div>
          <div>{reviewCount(dish.currentDishKey)}</div>
        </div>
        <img
          src={dish.photoURLs[0]}
          alt="dish"
          className="p-4 rounded-3xl drop-shadow-xl"
        />
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          <p className="text-purple text-xl font-semibold drop-shadow-lg">
            Photos
          </p>
          <div className="flex flex-wrap">{dishPhotos}</div>
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1">
          <p className="text-xl font-semibold drop-shadow-lg">Description</p>
          <p className="text-lg font-semibold pt-4">Story</p>
          <p className="text-xs lg:text-sm pt-4">{dish.story}</p>
          <p className="text-lg font-semibold pt-4">Contains</p>
          <p className="text-green text-sm lg:text-sm pt-4">
            {dishIngredients}
          </p>
          <p className="text-lg font-semibold pt-4">Attributes</p>
          <p className="text-green text-sm lg:text-sm pt-4">{dishAttributes}</p>
          <p className="text-lg font-semibold mb-3 pt-4">
            Wanna know more about the stall?
          </p>
          <Link to="/stall" state={stallFiltered}>
            <Button>Visit Stall!</Button>
          </Link>
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
          <p className="text-xl font-semibold drop-shadow-lg">Order</p>
          <FormOrder user={user} dish={dish} stall={stallFiltered} />
        </div>
        <div className="border-t-1 w-11/12 border-purple text-purple text-left p-1 mt-2">
          <p className="text-xl font-semibold drop-shadow-lg">Add A Review</p>
          {/* Need conditional rendering after checking whether past history - user has ordered this dish */}
          {haveOrdered ? (
            <FormReview user={user} dish={dish} stall={stallFiltered} />
          ) : (
            <div className="text-left text-orange text-lg font-bold border-2 rounded-xl shadow-lg p-2 mt-2">
              <p>
                Order this dish to add a review and help your favourite stall
                grow!
              </p>
            </div>
          )}
        </div>
        <ReviewCards currentDish={dish} />
      </div>
    </div>
  );
};

export default Dish;
