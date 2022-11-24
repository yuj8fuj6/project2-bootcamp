import React from "react";
import { Header, NavBar } from "../components";

const UserProfile = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>UserProfile</div>
    </div>
  );
};

export default UserProfile;
