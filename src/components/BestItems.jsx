import React, { useEffect, useState } from "react";

function BestItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          "https://clothing-backend-7.onrender.com/api/subcategories"
        );
        const data = await response.json();

        // ALL subcategories show
        setItems(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <>
      <style>{`
        .best-items-section {
          width: 100%;
          margin-top: 50px;
          padding: 0 20px;
        }

        .best-items-title {
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 28px;
        }

        .best-items-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 22px;
          flex-wrap: wrap;
        }

        .best-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.3s ease;
          width: 90px;
        }

        .best-item:hover {
          transform: translateY(-4px);
        }

        .best-item-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #f3f4f6;
        }

        .best-item-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .best-item-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-align: center;
          text-transform: capitalize;
          line-height: 1.2;
        }

        .best-item-category {
          font-size: 11px;
          color: #9ca3af;
          text-transform: capitalize;
          text-align: center;
          margin-top: -4px;
        }

        .best-items-loading,
        .best-items-empty {
          text-align: center;
          color: #6b7280;
          font-size: 15px;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .best-items-title {
            font-size: 24px;
          }

          .best-items-row {
            gap: 16px;
          }

          .best-item {
            width: 75px;
          }

          .best-item-circle {
            width: 75px;
            height: 75px;
          }

          .best-item-label {
            font-size: 12px;
          }

          .best-item-category {
            font-size: 10px;
          }
        }
      `}</style>

      <section className="best-items-section">
        <h2 className="best-items-title">Best Items</h2>

        {loading ? (
          <p className="best-items-loading">Loading...</p>
        ) : items.length === 0 ? (
          <p className="best-items-empty">No items found</p>
        ) : (
          <div className="best-items-row">
            {items.map((item) => (
              <div className="best-item" key={item._id}>
                <div className="best-item-circle">
                  <img src={item.image} alt={item.name} />
                </div>
                <p className="best-item-label">{item.name}</p>
                <p className="best-item-category">{item.category?.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default BestItems;