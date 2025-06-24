import axios from "axios";
import React, { useState } from "react";

const SearchBtn = ({ onSearch, fetchUser }) => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [SearchData, setSearchData] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(SearchTerm);
    }
    if (e.key === "Escape") {
      fetchUser();
      setSearchTerm("");
    }

    if (e) {
      fetchUser();
      onSearch(SearchTerm);
    }
  };

  return (
    <>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Search"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
        />
      </label>
    </>
  );
};

export default SearchBtn;
