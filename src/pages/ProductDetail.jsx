import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecryptedData } from "../utils/authStorage";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const allProductsRef = useRef([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        if (allProductsRef.current.length === 0) {
          const response = await fetch(
            "https://clothing-backend-7.onrender.com/api/products/"
          );
          const data = await response.json();

          const products = Array.isArray(data) ? data : data.products || [];
          allProductsRef.current = products;
        }

        const foundProduct = allProductsRef.current.find(
          (item) => String(item._id) === String(id)
        );

        setProduct(foundProduct || null);

        // Default color & size set
        if (foundProduct) {
          const defaultColor =
            foundProduct?.variants?.[0]?.color ||
            foundProduct?.color ||
            "";

          const defaultSize =
            foundProduct?.variants?.[0]?.size ||
            foundProduct?.size ||
            "";

          setSelectedColor(defaultColor);
          setSelectedSize(defaultSize);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const safeText = (value, fallback = "N/A") => {
    if (typeof value === "string" || typeof value === "number") return value;

    if (value && typeof value === "object") {
      return value.name || value.title || value.label || value._id || fallback;
    }

    return fallback;
  };

  const getUniqueColors = () => {
    if (!product) return [];

    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const colors = product.variants
        .map((v) => v.color)
        .filter(Boolean);

      return [...new Set(colors)];
    }

    if (product.color) return [product.color];

    return [];
  };

  const getUniqueSizes = () => {
    if (!product) return [];

    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const sizes = product.variants
        .map((v) => v.size)
        .filter(Boolean);

      return [...new Set(sizes)];
    }

    if (product.size) return [product.size];

    return [];
  };

  const handleAddToCart = async () => {
  try {
    const token = getDecryptedData("token");
    console.log("TOKEN:", token);

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!product?._id) {
      alert("Product not found");
      return;
    }

    setAddingToCart(true);

    const payload = {
      productId: product._id,
      color: selectedColor || "ice blue",
      size: selectedSize || "xl",
      quantity: 1,
    };

    console.log("ADD TO CART PAYLOAD:", payload);

    const response = await fetch("https://clothing-backend-7.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();
    console.log("RAW RESPONSE:", rawText);
    console.log("STATUS:", response.status);

    let data = {};
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = { message: rawText };
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    alert(data.message || "Added to cart successfully!");
    navigate("/cart");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert(error.message || "Something went wrong");
  } finally {
    setAddingToCart(false);
  }
};

  const colors = getUniqueColors();
  const sizes = getUniqueSizes();

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .pdp {
          width: 100%;
          min-height: 100vh;
          background: #ffffff;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        }

        .pdp-layout {
          max-width: 1320px;
          margin: 0 auto;
        }

        .pdp-right {
          width: 100%;
        }

        .pdp-card {
          display: grid;
          grid-template-columns: minmax(340px, 560px) 1fr;
          gap: 48px;
          align-items: start;
        }

        .pdp-image-wrap {
          position: relative;
          width: 100%;
          background: transparent;
          border: none;
          border-radius: 0;
          overflow: visible;
          padding: 0;
          box-shadow: none;
        }

        .pdp-category-overlay {
          position: absolute;
          top: 18px;
          left: 18px;
          font-size: 10px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          background: rgba(0, 0, 0, 0.55);
          padding: 7px 12px;
          border-radius: 999px;
          z-index: 5;
        }

        .pdp-image {
          width: 100%;
          height: 620px;
          object-fit: contain;
          display: block;
          background: #ffffff;
          border-radius: 10px;
          transition: transform 0.35s ease;
        }

        .pdp-image:hover {
          transform: scale(1.02);
        }

        .pdp-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          padding-top: 6px;
        }

        .pdp-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          width: 100%;
        }

        .pdp-name {
          font-size: 36px;
          font-weight: 700;
          color: #111111;
          text-transform: capitalize;
          line-height: 1.2;
          letter-spacing: -0.4px;
          flex: 1;
        }

        .pdp-price {
          font-size: 28px;
          font-weight: 800;
          color: #111111;
          white-space: nowrap;
          text-align: right;
        }

        .divider {
          height: 1px;
          background: #ececec;
          width: 100%;
        }

        .pdp-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 24px;
        }

        .meta-item {
          font-size: 14px;
          color: #5f5f5f;
          display: flex;
          flex-direction: column;
          gap: 6px;
          line-height: 1.6;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 0;
        }

        .meta-label {
          font-weight: 700;
          color: #111111;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 1.4px;
        }

        .pdp-desc-block {
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
        }

        .pdp-desc-title {
          font-size: 11px;
          font-weight: 800;
          color: #111111;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          margin-bottom: 10px;
        }

        .pdp-desc-text {
          font-size: 14px;
          color: #6f6f6f;
          line-height: 1.9;
        }

        .variant-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .variant-label {
          font-size: 12px;
          font-weight: 700;
          color: #111111;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }

        .variant-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .variant-btn {
          border: 1px solid #d1d5db;
          background: #fff;
          color: #111827;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-transform: capitalize;
          transition: all 0.2s ease;
        }

        .variant-btn.active {
          background: #111111;
          color: #ffffff;
          border-color: #111111;
        }

        .pdp-actions {
          display: flex;
          gap: 14px;
          margin-top: 6px;
        }

        .buy-btn,
        .cart-btn {
          flex: 1;
          border: none;
          border-radius: 12px;
          padding: 16px 14px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }

        .buy-btn {
          background: #111111;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
        }

        .cart-btn {
          background: #ffffff;
          color: #111111;
          border: 1.5px solid #111111;
        }

        .buy-btn:hover {
          transform: translateY(-2px);
          opacity: 0.92;
        }

        .cart-btn:hover {
          background: #111111;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .cart-btn:disabled,
        .buy-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .pdp-loading,
        .pdp-empty {
          text-align: center;
          font-size: 13px;
          color: #a9a9a9;
          margin-top: 120px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @media (max-width: 1100px) {
          .pdp-card {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .pdp-image {
            height: 500px;
          }

          .pdp-name {
            font-size: 30px;
          }

          .pdp-price {
            font-size: 24px;
          }
        }

        @media (max-width: 768px) {
          .pdp {
            padding: 22px 14px;
          }

          .pdp-image-wrap {
            padding: 12px;
            border-radius: 12px;
          }

          .pdp-image {
            height: 340px;
          }

          .pdp-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .pdp-name {
            font-size: 24px;
          }

          .pdp-price {
            font-size: 20px;
            text-align: left;
          }

          .pdp-meta {
            grid-template-columns: 1fr;
          }

          .pdp-actions {
            flex-direction: column;
          }

          .buy-btn,
          .cart-btn {
            width: 100%;
          }
        }
      `}</style>

      <section className="pdp">
        {loading ? (
          <p className="pdp-loading">Loading...</p>
        ) : !product ? (
          <p className="pdp-empty">Product not found</p>
        ) : (
          <div className="pdp-layout">
            <div className="pdp-right">
              <div className="pdp-card">
                <div className="pdp-image-wrap">
                  <p className="pdp-category-overlay">
                    {safeText(product.category, "Category")} /{" "}
                    {safeText(product.subcategory, "Subcategory")}
                  </p>

                  <img
                    src={product.image}
                    alt={safeText(product.name, "Product")}
                    className="pdp-image"
                  />
                </div>

                <div className="pdp-info">
                  <div className="pdp-title-row">
                    <h1 className="pdp-name">
                      {safeText(product.name, "Unnamed Product")}
                    </h1>
                    <p className="pdp-price">₹{safeText(product.price, "0")}</p>
                  </div>

                  <div className="divider" />

                  <div className="pdp-meta">
                    <p className="meta-item">
                      <span className="meta-label">Brand</span>
                      <span>{safeText(product.brand, "N/A")}</span>
                    </p>

                    <p className="meta-item">
                      <span className="meta-label">Category</span>
                      <span>{safeText(product.category, "N/A")}</span>
                    </p>

                    <p className="meta-item">
                      <span className="meta-label">Subcategory</span>
                      <span>{safeText(product.subcategory, "N/A")}</span>
                    </p>
                  </div>

                  <div className="divider" />

                  {colors.length > 0 && (
                    <div className="variant-section">
                      <p className="variant-label">Select Color</p>
                      <div className="variant-options">
                        {colors.map((color, index) => (
                          <button
                            key={index}
                            className={`variant-btn ${
                              selectedColor === color ? "active" : ""
                            }`}
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {sizes.length > 0 && (
                    <div className="variant-section">
                      <p className="variant-label">Select Size</p>
                      <div className="variant-options">
                        {sizes.map((size, index) => (
                          <button
                            key={index}
                            className={`variant-btn ${
                              selectedSize === size ? "active" : ""
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="divider" />

                  <div className="pdp-desc-block">
                    <h3 className="pdp-desc-title">Description</h3>
                    <p className="pdp-desc-text">
                      {safeText(
                        product.description,
                        "No description available."
                      )}
                    </p>
                  </div>

                  <div className="pdp-actions">
                    <button className="buy-btn">Buy Now</button>

                    <button
                      className="cart-btn"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                    >
                      {addingToCart ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductDetail;