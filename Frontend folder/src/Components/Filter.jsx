import React, { useState, useEffect } from "react";

const Filter = ({ onFilter }) => {
  const [filter, setFilter] = useState("");

  // Call onFilter whenever filter changes
  useEffect(() => {
    onFilter(filter);
    console.log("Current filter:", filter);
  }, [filter]);

  const handleFilter = (selectedFilter) => {
    // Toggle filter if clicking the same option twice
    setFilter((prev) => (selectedFilter === prev ? "" : selectedFilter));
  };

  return (
    <>
      <div className="dropdown dropdown-left dropdown-center">
        <div tabIndex={0} role="button" className="btn m-1">
          Filter
        </div>
        <div className="filter">
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button
                className={`btn ${filter === "" ? "active bg-red-500" : ""}`}
                onClick={() => handleFilter("")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`btn ${
                  filter === "user" ? "active btn-success" : ""
                }`}
                onClick={() => handleFilter("user")}
              >
                User
              </button>
            </li>
            <li>
              <button
                className={`btn ${
                  filter === "admin" ? "active btn-success" : ""
                }`}
                onClick={() => handleFilter("admin")}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Filter;
