import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecryptedData } from "../utils/authStorage";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      // 🔥 Encrypted token read pannanum
      const token = getDecryptedData("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await fetch("https://clothing-backend-7.onrender.com/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Cart API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      // Backend response shape handle
      let items = [];

      if (Array.isArray(data)) {
        items = data;
      } else if (Array.isArray(data.items)) {
        items = data.items;
      } else if (Array.isArray(data.cartItems)) {
        items = data.cartItems;
      } else if (Array.isArray(data.data)) {
        items = data.data;
      }

      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert(error.message || "Failed to load cart items");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (index, type) => {
    const updatedCart = [...cartItems];

    if (type === "increase") {
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    } else if (type === "decrease") {
      if ((updatedCart[index].quantity || 1) > 1) {
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) - 1;
      }
    }

    setCartItems(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const getProduct = (item) => {
    // Different backend structures handle pannudhu
    if (item.product && typeof item.product === "object") return item.product;
    if (item.productId && typeof item.productId === "object") return item.productId;
    return item;
  };

  const getImage = (product) => {
    if (Array.isArray(product?.image)) return product.image[0];
    if (Array.isArray(product?.images)) return product.images[0];
    return product?.image || product?.images || "https://via.placeholder.com/150";
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProduct(item);
      const price = Number(product?.price) || 0;
      const qty = item.quantity || 1;
      return total + price * qty;
    }, 0);
  };

  return (
    <>
      <style>{`
        .cart-page {
          width: 100%;
          min-height: 100vh;
          padding: 20px 16px 100px;
          background: #ffffff;
          font-family: Arial, sans-serif;
        }

        .cart-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 24px;
        }

        .cart-loading,
        .cart-empty {
          text-align: center;
          font-size: 16px;
          color: #6b7280;
          margin-top: 40px;
        }

        .cart-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 900px;
          margin: 0 auto;
        }

        .cart-card {
          display: flex;
          gap: 14px;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 14px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          align-items: center;
        }

        .cart-image {
          width: 100px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          background: #f3f4f6;
          flex-shrink: 0;
        }

        .cart-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cart-details {
          flex: 1;
        }

        .cart-name {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 6px;
          text-transform: capitalize;
        }

        .cart-brand,
        .cart-category,
        .cart-color,
        .cart-size {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
          text-transform: capitalize;
        }

        .cart-price {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin-top: 6px;
        }

        .cart-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .qty-btn,
        .remove-btn {
          border: none;
          cursor: pointer;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 14px;
        }

        .qty-btn {
          background: #111827;
          color: #fff;
        }

        .remove-btn {
          background: #ef4444;
          color: #fff;
        }

        .qty-text {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .cart-summary {
          max-width: 900px;
          margin: 24px auto 0;
          padding: 16px;
          border-radius: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cart-total {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }

        .checkout-btn {
          border: none;
          background: #111827;
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .cart-card {
            align-items: flex-start;
          }

          .cart-image {
            width: 85px;
            height: 105px;
          }

          .cart-title {
            font-size: 24px;
          }

          .cart-name {
            font-size: 15px;
          }

          .cart-price {
            font-size: 15px;
          }

          .cart-total {
            font-size: 18px;
          }
        }
      `}</style>

      <div className="cart-page">
        <h2 className="cart-title">My Cart</h2>

        {loading ? (
          <p className="cart-loading">Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-grid">
              {cartItems.map((item, index) => {
                const product = getProduct(item);

                return (
                  <div className="cart-card" key={product?._id || item?._id || index}>
                    <div className="cart-image">
                      <img
                        src={getImage(product)}
                        alt={product?.name || "Product"}
                      />
                    </div>

                    <div className="cart-details">
                      <h3 className="cart-name">{product?.name || "Product"}</h3>

                      {product?.brand && (
                        <p className="cart-brand">Brand: {product.brand}</p>
                      )}

                      {product?.category && typeof product.category === "string" && (
                        <p className="cart-category">Category: {product.category}</p>
                      )}

                      {item?.color && (
                        <p className="cart-color">Color: {item.color}</p>
                      )}

                      {item?.size && (
                        <p className="cart-size">Size: {item.size}</p>
                      )}

                      <p className="cart-price">₹{product?.price || 0}</p>

                      <div className="cart-actions">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(index, "decrease")}
                        >
                          -
                        </button>

                        <span className="qty-text">
                          Qty: {item.quantity || 1}
                        </span>

                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(index, "increase")}
                        >
                          +
                        </button>

                        <button
                          className="remove-btn"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="cart-total">Total: ₹{getTotal()}</div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;