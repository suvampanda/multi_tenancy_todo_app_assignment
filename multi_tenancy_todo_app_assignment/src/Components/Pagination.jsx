import { Box } from "@mui/material";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <Box className="pagination" style={{padding:"22px"}}>
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          style={buttonStyles}
        >
          Previous
        </button>
      )}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
          style={
            pageNumber === currentPage
              ? { ...buttonStyles, ...activeButtonStyles }
              : buttonStyles
          }
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          style={buttonStyles}
        >
          Next
        </button>
      )}
    </Box>
  );
};

const buttonStyles = {
  backgroundColor: "#fff",
  color: "#333",
  padding: "8px 16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginRight: "8px",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const activeButtonStyles = {
  backgroundColor: "#333",
  color: "#fff",
};

export default Pagination;
