import React from "react";

const SearchFunction = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSearchChange = (e) => {};

  return (
    <div className="flex items-center w-1/2">
      <div className="flex space-x-1">
        <input
          type="text"
          className="block w-full px-4 py-2 bg-white border rounded-full focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          id="search"
          onChange={handleSearchChange}
        />
        <button
          className="px-4 text-white bg-orange rounded-full"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchFunction;
