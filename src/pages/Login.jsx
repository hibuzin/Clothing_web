import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveEncryptedData } from "../utils/authStorage";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://clothing-backend-7.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save encrypted data in localStorage
      saveEncryptedData("token", data.token);
      saveEncryptedData("user", data.user);
      saveEncryptedData("address", data.address);

      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f9fafb;
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          background: #ffffff;
          padding: 32px 24px;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .login-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 24px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          outline: none;
          transition: 0.3s ease;
          box-sizing: border-box;
        }

        .login-input:focus {
          border-color: #111827;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #111827;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .login-btn:hover {
          opacity: 0.9;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;