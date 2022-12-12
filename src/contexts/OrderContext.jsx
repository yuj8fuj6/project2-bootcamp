import React, { createContext, useState, useEffect } from "react";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onChildAdded,
} from "firebase/database";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const orderArr = [];
    const orderData = query(
      databaseRef(db, `orders`),
      orderByChild(`user`),
    );
    onChildAdded(orderData, (snapshot) => {
      // console.log(snapshot.val())
      const currentOrder = snapshot.val();
      const currentOrderKey = snapshot.key;
      orderArr.push({ ...currentOrder, currentOrderKey });
      setOrderData(orderArr);
    });
  }, []);

  console.log(orderData);

  return (
    <OrderContext.Provider value={orderData}>
      {props.children}
    </OrderContext.Provider>
  );
};
