import React, { createContext, useState, useEffect } from "react";
import { ref as databaseRef, onChildAdded } from "firebase/database";
import { database } from "../firebase";

export const DishContext = createContext();

export const DishContextProvider = (props) => {
  const [dishData, setDishData] = useState([]);

  const DISHES_FOLDER_NAME = `dishes`;

  const dishDataRef = databaseRef(database, DISHES_FOLDER_NAME);
  const dishArray = [];
  useEffect(() => {
    onChildAdded(dishDataRef, (data) => {
      dishArray.push({ key: data.key, val: data.val() });
      setDishData([...dishArray]);
    });
  }, []);

  console.log(dishData);

  return (
    <DishContext.Provider value={dishData}>
      {props.children}
    </DishContext.Provider>
  );
};
