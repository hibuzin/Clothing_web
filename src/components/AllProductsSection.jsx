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
        setProducts(data);
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
          margin-top: 10px;
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
          gap: 14px;
        }

        /* Card has only the image now */
        .all-product-card {
          cursor: pointer;
        }

        .all-product-image {
          width: 100%;
          height: 180px;
          border-radius: 16px;
          overflow: hidden;
          background: #e5e7eb;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .all-product-card:hover .all-product-image {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .all-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Details are outside the card box */
        .all-product-details {
          padding: 10px 4px 4px;
        }

        .all-product-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
          text-transform: capitalize;
          line-height: 1.3;
        }

        .all-product-brand {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 3px;
          text-transform: capitalize;
        }

        .all-product-category {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 3px;
          text-transform: capitalize;
        }

        .all-product-color {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 6px;
          text-transform: capitalize;
        }

        .all-product-price {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
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
            gap: 20px;
          }

          .all-product-image {
            height: 220px;
          }

          .all-products-title {
            font-size: 32px;
          }

          .all-products-subtitle {
            font-size: 15px;
          }

          .all-product-name {
            font-size: 16px;
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
                {/* Only image inside the styled box */}
                <div className="all-product-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* All details outside the box */}
                <div className="all-product-details">
                  <h3 className="all-product-name">{item.name}</h3>

                  {item.brand && (
                    <p className="all-product-brand">Brand: {item.brand}</p>
                  )}

                  {item.category?.name && (
                    <p className="all-product-category">
                      Category: {item.category.name}
                    </p>
                  )}

                  {item.color && (
                    <p className="all-product-color">Color: {item.color}</p>
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