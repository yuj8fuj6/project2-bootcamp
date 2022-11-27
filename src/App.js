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
  Login,
} from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./firebase";
import { onChildAdded, ref as databaseRef } from "firebase/database";

function App() {
  const [user, setUser] = useState("");
  const [dishData, setDishData] = useState([]);

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
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={window.location.pathname || ""}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dish" element={<Dish dishData = {dishData}/>} />
          <Route path="/stall" element={<Stall />} />
          <Route path="/order" element={<Order />} />
          <Route path="/search" element={<Search />} />
          <Route path="/createDish" element={<CreateDish />} />
          <Route path="/createStall" element={<CreateStall />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
