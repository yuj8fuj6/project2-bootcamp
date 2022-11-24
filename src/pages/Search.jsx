import React from "react";
import { Header, NavBar } from "../components";

const Search = () => {
  return (
    <div>
      <div className="flex justify-around flex-wrap w-screen p-4">
        <Header />
        <NavBar />
      </div>
      <div>Search</div>
    </div>
  );
};

export default Search;
