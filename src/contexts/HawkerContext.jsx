import React, { createContext, useState, useEffect } from "react";
import { ref as databaseRef, onChildAdded } from "firebase/database";
import { database } from "../firebase";

export const HawkerContext = createContext();

export const HawkerContextProvider = (props) => {
  const [hawkerData, setHawkerData] = useState([]);

  const HAWKERS_FOLDER_NAME = `hawkers`;

  const hawkerDataRef = databaseRef(database, HAWKERS_FOLDER_NAME);
  const hawkerArray = [];

  useEffect(() => {
    onChildAdded(hawkerDataRef, (data) => {
      hawkerArray.push({ key: data.key, val: data.val() });
      setHawkerData([...hawkerArray]);
    });
  }, []);

  console.log(hawkerData)

  return (
    <HawkerContext.Provider value={hawkerData}>
      {props.children}
    </HawkerContext.Provider>
  );
};
