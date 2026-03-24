import React, { useEffect, useState } from "react";
import { getDecryptedData } from "../utils/authStorage";

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const token = getDecryptedData("token");

        if (!token) {
          setError("Please login to view your cart");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://clothing-backend-7.onrender.com/api/cart",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch cart");
        }

        setCartData(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px", textAlign: "center", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .cart-page {
          min-height: 100vh;
          background: #f9fafb;
          padding: 30px 20px 100px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .cart-card {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .cart-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 20px;
          text-align: center;
        }

        .cart-info {
          margin-bottom: 20px;
          padding: 14px;
          border-radius: 12px;
          background: #f3f4f6;
        }

        .cart-info p {
          margin: 6px 0;
          font-size: 14px;
          color: #374151;
          word-break: break-word;
        }

        .cart-empty {
          font-size: 16px;
          color: #6b7280;
          padding: 30px 0;
          text-align: center;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          background: #ffffff;
        }

        .cart-item p {
          margin: 6px 0;
          font-size: 14px;
          color: #111827;
        }
      `}</style>

      <div className="cart-page">
        <div className="cart-card">
          <h2 className="cart-title">My Cart</h2>

          {cartData && (
            <div className="cart-info">
              <p><strong>Cart ID:</strong> {cartData._id}</p>
              <p><strong>User ID:</strong> {cartData.user}</p>
              <p><strong>Total Items:</strong> {cartData.items?.length || 0}</p>
            </div>
          )}

          {cartData?.items?.length === 0 ? (
            <p className="cart-empty">Your cart is empty 🛒</p>
          ) : (
            <div className="cart-items">
              {cartData?.items?.map((item, index) => (
                <div key={item._id || index} className="cart-item">
                  <p><strong>Item {index + 1}</strong></p>
                  <p><strong>Product ID:</strong> {item.product || "N/A"}</p>
                  <p><strong>Quantity:</strong> {item.quantity || 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;