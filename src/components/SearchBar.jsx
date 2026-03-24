import React from "react";

function SearchBar() {
  return (
    <>
      <style>{`
        .search-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 30px;
        }

        .search-input {
          width: 320px;
          max-width: 90%;
          border: none;
          outline: none;
          background: transparent;
          border-bottom: 1px solid #111827;
          padding: 8px 4px;
          font-size: 15px;
          color: #111827;
        }

        .search-input::placeholder {
          color: #6b7280;
        }
      `}</style>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
        />
      </div>
    </>
  );
}

export default SearchBar;