import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          "https://clothing-backend-7.onrender.com/api/products/"
        );
        const data = await response.json();
        setProducts(data.products || data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <style>{`
        .all-products-section {
          width: 100%;
          margin-top: 20px;
          padding: 0 14px 100px;
        }

        .all-products-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .all-products-subtitle {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 28px;
        }

        .all-products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .all-product-card {
          background: #ffffff;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #f3f4f6;
        }

        .all-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
        }

        .all-product-image {
          width: 100%;
          height: 210px;
          background: #f9fafb;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .all-product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .all-product-details {
          padding: 12px;
        }

        .all-product-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 6px;
          text-transform: capitalize;
          line-height: 1.4;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 40px;
        }

        .all-product-category {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: capitalize;
        }

        .all-product-price {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .all-products-loading,
        .all-products-empty {
          text-align: center;
          color: #6b7280;
          font-size: 15px;
          margin-top: 10px;
        }

        @media (min-width: 768px) {
          .all-products-section {
            padding: 0 20px 120px;
          }

          .all-products-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 22px;
          }

          .all-product-image {
            height: 250px;
          }

          .all-products-title {
            font-size: 32px;
          }

          .all-products-subtitle {
            font-size: 15px;
          }

          .all-product-name {
            font-size: 15px;
          }

          .all-product-price {
            font-size: 17px;
          }
        }
      `}</style>

      <section className="all-products-section">
        <h2 className="all-products-title">All Products</h2>
        <p className="all-products-subtitle">Shop as your wish</p>

        {loading ? (
          <p className="all-products-loading">Loading...</p>
        ) : products.length === 0 ? (
          <p className="all-products-empty">No products found</p>
        ) : (
          <div className="all-products-grid">
            {products.map((item) => (
              <div
                className="all-product-card"
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <div className="all-product-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="all-product-details">
                  <h3 className="all-product-name">{item.name}</h3>

                  {item.category?.name && (
                    <p className="all-product-category">{item.category.name}</p>
                  )}

                  <p className="all-product-price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default AllProductsSection;