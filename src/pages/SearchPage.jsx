import React, { useState } from "react";

function SearchPage() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <style>{`
        .search-page {
          min-height: 100vh;
          background: #f9fafb;
          padding: 30px 20px 100px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .search-card {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .search-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 20px;
          text-align: center;
        }

        .search-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          margin-bottom: 20px;
        }

        .search-input:focus {
          border-color: #111827;
        }

        .search-placeholder {
          text-align: center;
          color: #6b7280;
          font-size: 16px;
          padding: 20px 0;
        }
      `}</style>

      <div className="search-page">
        <div className="search-card">
          <h2 className="search-title">Search</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <p className="search-placeholder">
            {searchText
              ? `Searching for: "${searchText}"`
              : "Start typing to search products 🔍"}
          </p>
        </div>
      </div>
    </>
  );
}

export default SearchPage;