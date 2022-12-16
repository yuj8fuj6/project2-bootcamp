import React, { createContext, useState, useEffect } from "react";
import {
  ref as databaseRef,
  getDatabase,
  query,
  orderByChild,
  onChildAdded,
} from "firebase/database";

export const HawkerContext = createContext();

export const HawkerContextProvider = (props) => {
  const [hawkerData, setHawkerData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const hawkerArr = [];
    const hawkerData = query(
      databaseRef(db, `hawkers`),
      orderByChild(`stallName`)
    );
    onChildAdded(hawkerData, (snapshot) => {
      const currentHawker = snapshot.val();
      const currentHawkerKey = snapshot.key;
      hawkerArr.push({ ...currentHawker, currentHawkerKey });
      setHawkerData(hawkerArr);
    });
  }, []);

  return (
    <HawkerContext.Provider value={hawkerData}>
      {props.children}
    </HawkerContext.Provider>
  );
};
