import React, { useState } from "react";

const Pagination = ({ onPagination, totalPages = 2 }) => {
  const [page, setPage] = useState(1);

  const handlePagination = (direction) => {
    let newPage = page;

    if (direction == "prev" && page >= 1) {
      newPage = page - 1;
    } else if (direction == "next" && page < totalPages) {
      newPage = page + 1;
    }

    setPage(newPage);
    onPagination(newPage);
  };

  return (
    <>
      <div className="join">
        <button
          className="join-item btn btn-primary"
          onClick={() => handlePagination("prev")}
          disabled={page <= 1}
        >
          «
        </button>
        <button className="join-item btn">
          {page} of {totalPages}
        </button>
        <button
          className="join-item btn btn-primary"
          onClick={() => handlePagination("next")}
          disabled={page >= totalPages}
        >
          »
        </button>
      </div>
    </>
  );
};
export default Pagination;
