import React from "react";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // If you store token/user data, clear it here
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to home page after logout
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#111827" }}>My Account</h2>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MyAccount;