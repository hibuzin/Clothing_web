import React, { useEffect, useState } from "react";

function Girls() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          "https://clothing-backend-7.onrender.com/api/subcategories/6958b227ea146efcd573bac3"
        );
        const data = await response.json();
        setSubcategories(data);
      } catch (err) {
        setError("Failed to fetch subcategories");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Girls' Categories</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {subcategories.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              width: "150px",
              textAlign: "center",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p style={{ marginTop: "8px", fontWeight: "bold", textTransform: "capitalize" }}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Girls;