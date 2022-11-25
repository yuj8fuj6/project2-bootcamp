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
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
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
          <Route path="/dish" element={<Dish />} />
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
