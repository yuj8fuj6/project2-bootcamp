import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsTelephone, BsSearch, BsPersonCircle } from "react-icons/bs";
import { UserContext } from "../App";
import { HashLink } from "react-router-hash-link";

const NavBar = () => {
  const userDetails = useContext(UserContext);

  return (
    <div className="text-orange flex justify-evenly w-5/12 text-nav place-items-center">
      <HashLink smooth to="#feedback">
        <BsTelephone />
        <div className="text-xxs">Contact</div>
      </HashLink>
      <Link to="/order">
        <BsSearch />
        <div className="text-xxs">Search</div>
      </Link>
      {userDetails ? (
        <Link to="/profile">
          <BsPersonCircle />
          <div className="text-xxs">Profile</div>
        </Link>
      ) : (
        <Link to="/login">
          <BsPersonCircle />
          <div className="text-xxs">Login</div>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
