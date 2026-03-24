import React, { useEffect, useState } from "react";

function TrendingSection() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(
          "https://clothing-backend-7.onrender.com/api/products/subcategory/6958bb9eea146efcd573bb25"
        );
        const data = await response.json();
        setTrendingItems(data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <>
      <style>{`
        .trending-section {
          width: 100%;
          margin-top: 60px;
          padding: 0 20px 100px;
        }

        .trending-title {
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 28px;
        }

        .trending-row {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 20px;
          flex-wrap: wrap;
        }

        .trending-card {
          width: 220px;
          background: white;
          border-radius: 18px;
          padding: 14px;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .trending-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .trending-image {
          width: 100%;
          height: 220px;
          border-radius: 14px;
          overflow: hidden;
          background: #e5e7eb;
          margin-bottom: 14px;
        }

        .trending-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .trending-card-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 6px;
          text-transform: capitalize;
          line-height: 1.3;
        }

        .trending-card-brand {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
          text-transform: capitalize;
        }

        .trending-card-color {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: capitalize;
        }

        .trending-card-price {
          font-size: 17px;
          font-weight: 700;
          color: #111827;
        }

        .trending-loading,
        .trending-empty {
          text-align: center;
          color: #6b7280;
          font-size: 15px;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .trending-section {
            margin-top: 50px;
            padding: 0 14px 90px;
          }

          .trending-title {
            font-size: 24px;
          }

          .trending-row {
            gap: 14px;
            justify-content: center;
          }

          .trending-card {
            width: calc(50% - 8px);
            min-width: unset;
            padding: 12px;
            border-radius: 16px;
          }

          .trending-image {
            height: 170px;
            border-radius: 12px;
          }

          .trending-card-title {
            font-size: 14px;
          }

          .trending-card-brand,
          .trending-card-color {
            font-size: 12px;
          }

          .trending-card-price {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .trending-card {
            width: calc(50% - 7px);
          }

          .trending-image {
            height: 150px;
          }
        }
      `}</style>

      <section className="trending-section">
        <h2 className="trending-title">Trending</h2>

        {loading ? (
          <p className="trending-loading">Loading...</p>
        ) : trendingItems.length === 0 ? (
          <p className="trending-empty">No products found</p>
        ) : (
          <div className="trending-row">
            {trendingItems.map((item) => (
              <div className="trending-card" key={item._id}>
                <div className="trending-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <h3 className="trending-card-title">{item.name}</h3>

                {item.brand && (
                  <p className="trending-card-brand">Brand: {item.brand}</p>
                )}

                {item.color && (
                  <p className="trending-card-color">Color: {item.color}</p>
                )}

                <p className="trending-card-price">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default TrendingSection;