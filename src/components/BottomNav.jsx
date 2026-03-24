import React, { useState } from "react";
import {
  FaHome,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { getDecryptedData } from "../utils/authStorage";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState("home");

  const navItems = [
    { id: "home", icon: <FaHome /> },
    { id: "fav", icon: <FaHeart /> },
    { id: "search", icon: <FaSearch /> },
    { id: "cart", icon: <FaShoppingCart /> },
    { id: "person", icon: <FaUser /> },
  ];

  const handleNavigation = (id) => {
    setActiveNav(id);

    if (id === "home") {
      navigate("/");
    } else if (id === "fav") {
      navigate("/wishlist");
    } else if (id === "search") {
      navigate("/search");
    } else if (id === "cart") {
      navigate("/cart");
    } else if (id === "person") {
      const token = getDecryptedData("token");

      if (token) {
        navigate("/my-account");
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 68px;
          background: white;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
          z-index: 999;
        }

        .bottom-nav-btn {
          border: none;
          background: transparent;
          outline: none;
          cursor: pointer;
          font-size: 22px;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .bottom-nav-btn.active {
          color: #111827;
          transform: translateY(-2px);
        }

        .bottom-nav-btn:hover {
          color: #111827;
        }

        @media (min-width: 769px) {
          .bottom-nav {
            max-width: 430px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 18px 18px 0 0;
          }
        }
      `}</style>

      <nav className="bottom-nav">
        {navItems.map((item) => {
          let isActive = false;

          if (item.id === "home" && location.pathname === "/") isActive = true;
          if (item.id === "fav" && location.pathname === "/wishlist") isActive = true;
          if (item.id === "search" && location.pathname === "/search") isActive = true;
          if (item.id === "cart" && location.pathname === "/cart") isActive = true;
          if (
            item.id === "person" &&
            (location.pathname === "/my-account" || location.pathname === "/login")
          ) {
            isActive = true;
          }

          return (
            <button
              key={item.id}
              className={`bottom-nav-btn ${isActive ? "active" : ""}`}
              onClick={() => handleNavigation(item.id)}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default BottomNav;