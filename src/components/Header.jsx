import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="text-left">
      <Link to="/">
        <p className="text-orange text-5xl drop-shadow-lg pb-1">Yumee!</p>
        <p className="h1">"A Platform for Hawkers by Hawkers"</p>
        <p className="text-purple italic font-semibold text-xxs">
          To promote Singapore's Hawker Culture
        </p>
      </Link>
    </div>
  );
};

export default Header;
