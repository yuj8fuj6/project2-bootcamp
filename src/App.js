import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  CreateDish,
  CreateStall,
  Dish,
  Landing,
  Order,
  Registration,
  Search,
  Stall,
  UserProfile,
} from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import { onChildAdded, ref as databaseRef } from "firebase/database";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState("");
  const [dishData, setDishData] = useState([]);
  const [hawkerData, setHawkerData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }, []);

  const DISHES_FOLDER_NAME = "dishes";

  const dishDataRef = databaseRef(database, DISHES_FOLDER_NAME);

  useEffect(() => {
    const dish = [];
    onChildAdded(dishDataRef, (data) => {
      dish.push({ key: data.key, val: data.val() });
      setDishData([...dish]);
    });

    onChildAdded(hawkerDataRef, (data) => {
      setHawkerData((prevHawkerData) => [
        ...prevHawkerData,
        { key: data.key, ...data.val() },
      ]);
    });
  }, []);

  // console.log(dishData);

  const HAWKERS_FOLDER_NAME = "hawkers";

  const hawkerDataRef = databaseRef(database, HAWKERS_FOLDER_NAME);

  useEffect(() => {
    const hawker = [];
    onChildAdded(hawkerDataRef, (data) => {
      hawker.push({ key: data.key, val: data.val() });
      setHawkerData([...hawker]);
    });
  }, []);

  // console.log(hawkerData);

  return (
    <div className="App">
      <BrowserRouter basename={window.location.pathname || ""}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dish" element={<Dish dishData={dishData} />} />
          <Route
            path="/stall"
            element={<Stall hawkerData={hawkerData} dishData={dishData} />}
          />
          <Route path="/order" element={<Order dishData={dishData}/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/createDish" element={<CreateDish />} />
          <Route path="/createStall" element={<CreateStall />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
