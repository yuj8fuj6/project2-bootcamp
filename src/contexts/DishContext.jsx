import React, { createContext, useState, useEffect } from "react";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onChildAdded,
} from "firebase/database";

export const DishContext = createContext();

export const DishContextProvider = (props) => {
  const [dishData, setDishData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dishArr = [];
    const dishData = query(databaseRef(db, `dishes`), orderByChild(`dishName`));
    onChildAdded(dishData, (snapshot) => {
      //  console.log(snapshot.key)
      const currentDish = snapshot.val();
      const currentDishKey = snapshot.key;
      dishArr.push({ ...currentDish, currentDishKey });
      setDishData(dishArr);
    });
  }, []);

  return (
    <DishContext.Provider value={dishData}>
      {props.children}
    </DishContext.Provider>
  );
};
