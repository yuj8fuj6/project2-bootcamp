import React, { useCallback, useState, useEffect, useContext } from "react";

import { UserContext } from "../App";
import {
  ref as databaseRef,
  getDatabase,
  query,
  equalTo,
  orderByChild,
  remove,
  onValue,
} from "firebase/database";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";

const MenuList = ({ stall }) => {
  const [currentStall, setCurrentStall] = useState(...stall);
  console.log(currentStall);
  const [stallMenu, setStallMenu] = useState([]);
  const db = getDatabase();

  const getMenuDetails = useCallback(() => {
    const menuQuery = query(
      databaseRef(db, "dishes/"),
      orderByChild("hawkerKey"),
      equalTo(currentStall.stallKey)
    );

    onValue(menuQuery, (snapshot) => {
      if (snapshot.exists()) {
        const dishKeys = Object.keys(snapshot.val());
        const dishDetails = Object.values(snapshot.val());
        const dishArr = [];
        for (let i = 0; i < dishDetails.length; i++) {
          dishArr.push({ ...dishDetails[i], dishKey: dishKeys[i] });
          setStallMenu(dishArr);
        }
      }
    });
  }, []);

  useEffect(() => {
    getMenuDetails();
  }, [getMenuDetails]);

  const navigate = useNavigate();
  console.log(stallMenu);

  const deleteMenu = (dishKey) => {
    const db = getDatabase();
    remove(databaseRef(db, `dishes/` + dishKey));
  };

  return (
    <div>
      <div className="p-4 text-left">
        <h4 className="text-lg font-extrabold text-purple">Stall Menu</h4>
        <ol>
          {stallMenu.map((dish) => (
            <li className="text-sm text-purple" key={dish.dishKey}>
              {dish.dishName}
              <Button type="button" onClick={() => deleteMenu(dish.dishKey)}>
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => navigate("/editDish", { state: dish })}
              >
                Edit
              </Button>
            </li>
          ))}
        </ol>
        <Button
          className="text-black"
          type="button"
          onClick={() => navigate("/createDish", { state: stall })}
        >
          Add Dish
        </Button>
      </div>
    </div>
  );
};

const StallList = () => {
  const user = useContext(UserContext);
  const [stallDetails, setStallDetails] = useState([]);
  console.log(stallDetails);

  //retrieve stall details and set to stall details
  const getStallDetails = useCallback(() => {
    const db = getDatabase();
    const stallQuery = query(
      databaseRef(db, `hawkers/`),
      orderByChild("userKey"),
      equalTo(user.uid)
    );
    let stallKeys = [];
    let stallInfo = [];
    onValue(stallQuery, (snapshot) => {
      if (snapshot.exists()) {
        stallKeys = Object.keys(snapshot.val());
        stallInfo = Object.values(snapshot.val());
        const stallArr = [];
        for (let i = 0; i < stallInfo.length; i++) {
          stallArr.push({ ...stallInfo[i], stallKey: stallKeys[i] });
          setStallDetails(stallArr);
        }
      }
    });
  }, []);

  useEffect(() => {
    getStallDetails();
  }, [getStallDetails]);

  const navigate = useNavigate();

  const deleteStall = (stallKey) => {
    const db = getDatabase();
    const stallRef = databaseRef(db, "hawkers/" + stallKey);
    remove(stallRef);

    const userHawkerRef = databaseRef(
      db,
      "user-hawkers/" + user.uid + stallKey
    );
    remove(userHawkerRef);

    const hawkerDishesRef = databaseRef(db, "hawker-dishes/" + stallKey);
    remove(hawkerDishesRef);
  };

  if (stallDetails.length > 0) {
    return (
      <div className="flex justify-around flex-wrap w-screen p-1">
        <div className="flex justify-evenly flex-wrap sm:flex-1 overflow-auto h-[32rem]">
          <div className="text-purple text-2xl">Your Stalls</div>
          {stallDetails.map((stall) => (
            <div
              key={stall.stallKey}
              className="w-full rounded-lg shadow-md lg:max-w-sm hover:bg-orange/90 hover:opacity-75"
            >
              <img
                className="object-cover w-full h-72 p-2 rounded-2xl drop-shadow-xl"
                src={stall.stallFrontPhotoURL}
                alt="stallfront"
              />

              <div className="p-4 text-left">
                <p className="text-xl font-bold text-purple">Stall Name</p>
                <p className="text-lg text-purple">{stall.stallName}</p>
                <p className="text-sm text-purple">{stall.stallAddress}</p>
              </div>
              <MenuList stall={stallDetails} />
              <p className="m-2 mt-5 mb-10">
                <Button
                  type="button"
                  onClick={() => deleteStall(stall.stallKey)}
                >
                  Delete Stall
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/editStall", { state: stall })}
                >
                  Edit Stall
                </Button>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default StallList;
