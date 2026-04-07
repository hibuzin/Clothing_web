import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SubcategoryProducts() {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://clothing-backend-7.onrender.com/api/products/subcategory/${subcategoryId}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching subcategory products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (subcategoryId) {
      fetchProducts();
    }
  }, [subcategoryId]);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Subcategory Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "15px",
                background: "#fff",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3 style={{ marginTop: "10px", fontSize: "18px" }}>
                {product.name}
              </h3>
              <p style={{ color: "#6b7280", margin: "6px 0" }}>
                ₹{product.price}
              </p>
              <p style={{ fontSize: "14px", color: "#374151" }}>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubcategoryProducts;