import React, { useCallback, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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

const MenuList = ({ stall }) => {
  console.log(stall);
  console.log(...stall);
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
        console.log(snapshot.val());
        const dishKeys = Object.keys(snapshot.val());
        console.log(dishKeys);
        const dishDetails = Object.values(snapshot.val());
        console.log(dishDetails);
        const dishArr = [];
        for (let i = 0; i < dishDetails.length; i++) {
          dishArr.push({ ...dishDetails[i], dishKey: dishKeys[i] });
          console.log(dishArr);
          setStallMenu(dishArr);
        }
      }
    });
  });

  useEffect(() => {
    getMenuDetails();
  }, []);

  const navigate = useNavigate();
  console.log(stallMenu);

  return (
    <div>
      <div className="p-4 text-left">
        <h4 className="text-lg font-extrabold text-purple">Stall Menu</h4>
        <ol>
          {stallMenu.map((dish) => (
            <li
              className="text-sm font-extrabold text-purple"
              key={dish.dishKey}
            >
              {dish.dishName}
            </li>
          ))}
        </ol>
        <Button
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
  }, [stallDetails, user]);

  useEffect(() => {
    getStallDetails();
  }, []);
  console.log(stallDetails);

  const navigate = useNavigate();

  const deleteStall = (stallKey) => {
    const db = getDatabase();
    const stallRef = databaseRef(db, "dishes/" + stallKey);
    remove(stallRef);
  };

  if (stallDetails.length > 0) {
    return (
      <div className="flex justify-around flex-wrap w-screen p-1">
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
              <h4 className="text-lg font-extrabold text-purple">
                {stall.stallName}
              </h4>
              <h5 className="text-sm font-extrabold text-purple">
                {stall.stallAddress}
              </h5>
            </div>
            <MenuList stall={stallDetails} />

            <p className="m-2 mt-5 mb-10">
              <Button type="button" onClick={() => deleteStall(stall.stallKey)}>
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
    );
  }
};

export default StallList;
