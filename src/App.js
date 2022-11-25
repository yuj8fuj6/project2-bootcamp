import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  CreateDish,
  CreateStall,
  Dish,
  Landing,
  Login,
  Order,
  Registration,
  Search,
  Stall,
  UserProfile,}
  from "./pages"

function App() {
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
