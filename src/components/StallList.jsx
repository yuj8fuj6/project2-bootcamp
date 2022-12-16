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

const MenuList = ({ stallDetail }) => {
  const [currentStall, setCurrentStall] = useState(stallDetail);
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

  const deleteMenu = (dishKey) => {
    const db = getDatabase();
    remove(databaseRef(db, `dishes/` + dishKey));
  };

  return (
    <div>
      <div className="p-4 text-left">
        <div className="flex align-middle">
          <h4 className="text-lg font-extrabold text-purple pr-2">
            Stall Menu
          </h4>
          <button
            className="text-gray-500 flex pt-2"
            type="button"
            onClick={() => navigate("/createDish", { state: currentStall })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <h5 className="text-sm pl-1">Add dish</h5>
          </button>
        </div>

        <ol>
          {stallMenu.map((dish) => (
            <li className="text-md text-green" key={dish.dishKey}>
              {console.log(dish)}
              {dish.dishName}
              <button
                type="button"
                onClick={() => deleteMenu(dish.dishKey)}
                className="text-gray-500 pl-1 pr-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => navigate("/editDish", { state: dish })}
                className="text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ol>
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
      <div>
        <div className="text-purple text-2xl">Your Stalls</div>

        <div className="flex flex-wrap justify-center md:items-center sm:flex-1 overflow-auto h-[32rem] border">
          {stallDetails.map((stall) => (
            <div
              key={stall.stallKey}
              className="rounded-lg shadow-md sm:min-w-sm lg:max-w-sm hover:bg-orange/10 hover:opacity-75"
            >
              <img
                className="object-cover w-full h-72 p-2 rounded-2xl drop-shadow-xl"
                src={stall.stallFrontPhotoURL}
                alt="stallfront"
              />

              <div className="p-4 text-left">
                <p className="text-xl font-bold text-purple">Stall Name</p>
                <p className="text-lg text-green">{stall.stallName}</p>
                <p className="text-sm text-green font-medium italic">
                  {stall.stallAddress}
                </p>
              </div>
              <MenuList stallDetail={stall} />
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
