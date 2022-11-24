import React from "react";
import { Link } from "react-router-dom";
import { BsTelephone, BsSearch, BsPersonCircle } from "react-icons/bs";

const NavBar = () => {
  return (
    <div className="text-orange flex justify-evenly w-5/12 text-nav place-items-center">
      <Link to="/">
        <BsTelephone />
        <div className="text-xxs">Contact</div>
      </Link>
      <Link to="/search">
        <BsSearch />
        <div className="text-xxs">Search</div>
      </Link>
      <Link to="/profile">
        <BsPersonCircle />
        <div className="text-xxs">Log In</div>
      </Link>
    </div>
  );
};

export default NavBar;
