import React from "react";
import { NavLink } from "react-router-dom";

function TabsBar() {
  const tabs = [
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Boys", path: "/boys" },
    { name: "Girls", path: "/girls" },
  ];

  return (
    <>
      <style>{`
        .top-header {
          width: 100%;
          padding: 18px 0;
          display: flex;
          justify-content: center;
          background: transparent;
          box-shadow: none;
        }

        .tabs-bar {
          display: flex;
          gap: 30px;
          align-items: center;
          justify-content: center;
          padding: 0;
         flex-wrap: nowrap;
overflow: hidden;
        }

        .tab-link {
          text-decoration: none;
          color: #111827;
          font-size: 16px;
          font-weight: 500;
          opacity: 0.45;
          transition: all 0.3s ease;
        }

        .tab-link:hover {
          opacity: 0.75;
        }

        
      `}</style>

      <header className="top-header">
        <nav className="tabs-bar">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `tab-link ${isActive ? "active" : ""}`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
}

export default TabsBar;