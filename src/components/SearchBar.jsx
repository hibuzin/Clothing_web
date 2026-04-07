import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

function SearchBar() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .search-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 25px 16px 0;
        }

        .search-bar-container {
          width: 100%;
          max-width: 900px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .left-icons,
        .right-icons {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #111827;
          font-size: 18px;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .icon-btn:hover {
          transform: translateY(-2px);
          color: #4f46e5;
        }

        .search-box {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .search-input {
          width: 100%;
          max-width: 420px;
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

        @media (max-width: 768px) {
          .search-bar-container {
            gap: 8px;
          }

          .left-icons,
          .right-icons {
            gap: 8px;
          }

          .icon-btn {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }

          .search-input {
            max-width: 100%;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="search-wrapper">
        <div className="search-bar-container">
          {/* Left Icons */}
          <div className="left-icons">
            <button className="icon-btn" aria-label="Home">
              <FaHome />
            </button>
            <button className="icon-btn" aria-label="Favorites">
              <FaHeart />
            </button>
          </div>

          {/* Search Input */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
            />
          </div>

          {/* Right Icons */}
          <div className="right-icons">
            <button
  className="icon-btn"
  aria-label="Cart"
  onClick={() => navigate("/cart")}
>
  <FaShoppingCart />
</button>
            <button
              className="icon-btn"
              aria-label="Profile"
              onClick={() => navigate("/Login")}
            >
              <FaUser />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;