import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
          allProductsRef.current = data;
          setAllProducts(data);
        }

        const foundProduct = allProductsRef.current.find(
          (item) => item._id === id
        );
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const currentIndex = allProducts.findIndex((item) => item._id === id);
  const nextProduct = currentIndex !== -1 ? allProducts[currentIndex + 1] ?? null : null;
  const prevProduct = currentIndex !== -1 ? allProducts[currentIndex - 1] ?? null : null;

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
          background: #fff;
        }

        .pdp-image-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .pdp-category-overlay {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 10px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          padding: 6px 10px;
          border-radius: 3px;
          z-index: 5;
        }

        /* Main shirt */
        .pdp-image {
          width: 100%;
          height: 380px;
          object-fit: contain;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .pdp-image:hover {
          transform: scale(1.03);
        }

        /*Next shirt*/

        .corner-next {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          cursor: pointer;
          z-index: 10;
        }

        .corner-next:hover .corner-thumb {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
        }

        .corner-next:hover .corner-badge {
          background: #0a0a0a;
          color: #fff;
        }


        /*Prev shirt*/
        .corner-prev {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          cursor: pointer;
          z-index: 10;
        }

        .corner-prev:hover .corner-thumb {
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(0,0,0,0.22);
        }

        .corner-prev:hover .corner-badge {
          background: #0a0a0a;
          color: #fff;
        }

        .corner-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #fff;
          padding: 3px 8px;
          transition: all 0.25s ease;
        }

        .corner-thumb {
          width: 72px;
          height: 90px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .corner-name {
          font-size: 9px;
          font-weight: 600;
          color: #fff;
          background: rgba(0,0,0,0.55);
          padding: 2px 7px;
          letter-spacing: 0.5px;
          text-transform: capitalize;
          max-width: 90px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pdp-info {
          padding: 24px 16px 80px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }

        .pdp-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
        }

        .pdp-name {
          font-size: 26px;
          font-weight: 700;
          color: #0a0a0a;
          text-transform: capitalize;
          line-height: 1.2;
          letter-spacing: -0.4px;
          flex: 1;
          margin: 0;
        }

        .pdp-price {
          font-size: 21px;
          font-weight: 700;
          color: #0a0a0a;
          white-space: nowrap;
          margin: 0;
          text-align: right;
        }

        .divider {
          height: 1px;
          background: #f0f0f0;
        }

        .pdp-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .meta-item {
          font-size: 13px;
          color: #6b6b6b;
          text-transform: capitalize;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .meta-label {
          font-weight: 700;
          color: #0a0a0a;
          min-width: 90px;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .pdp-desc-title {
          font-size: 10px;
          font-weight: 700;
          color: #0a0a0a;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .pdp-desc-text {
          font-size: 13px;
          color: #7a7a7a;
          line-height: 1.9;
        }

        .pdp-actions {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .buy-btn,
        .cart-btn {
          flex: 1;
          border: none;
          border-radius: 0;
          padding: 16px 12px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .buy-btn {
          background: #0a0a0a;
          color: #fff;
        }

        .cart-btn {
          background: #fff;
          color: #0a0a0a;
          border: 1.5px solid #0a0a0a;
        }

        .buy-btn:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }

        .cart-btn:hover {
          background: #0a0a0a;
          color: #fff;
          transform: translateY(-1px);
        }

        .pdp-loading,
        .pdp-empty {
          text-align: center;
          font-size: 13px;
          color: #c0c0c0;
          margin-top: 100px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @media (min-width: 768px) {
          .pdp-image {
            height: 420px;
          }

          .pdp-info {
            padding: 40px 24px 100px;
          }

          .pdp-name {
            font-size: 32px;
          }

          .pdp-price {
            font-size: 24px;
          }

          .pdp-category-overlay {
            top: 20px;
            left: 20px;
          }
        }
      `}</style>

      <section className="pdp">
        {loading ? (
          <p className="pdp-loading">Loading...</p>
        ) : !product ? (
          <p className="pdp-empty">Product not found</p>
        ) : (
          <>
            <div className="pdp-image-wrap">
              <p className="pdp-category-overlay">
                {product.category?.name} / {product.subcategory?.name}
              </p>

              <img
                src={product.image}
                alt={product.name}
                className="pdp-image"
              />

              {nextProduct && (
                <div
                  className="corner-next"
                  onClick={() => navigate(`/product/${nextProduct._id}`)}
                >
                  <span className="corner-badge">Next →</span>
                  <img
                    src={nextProduct.image}
                    alt={nextProduct.name}
                    className="corner-thumb"
                  />
                  <span className="corner-name">{nextProduct.name}</span>
                </div>
              )}

              {prevProduct && (
                <div
                  className="corner-prev"
                  onClick={() => navigate(`/product/${prevProduct._id}`)}
                >
                  <span className="corner-badge">← Prev</span>
                  <img
                    src={prevProduct.image}
                    alt={prevProduct.name}
                    className="corner-thumb"
                  />
                  <span className="corner-name">{prevProduct.name}</span>
                </div>
              )}
            </div>

            <div className="pdp-info">
              <div className="pdp-title-row">
                <h1 className="pdp-name">{product.name}</h1>
                <p className="pdp-price">₹{product.price}</p>
              </div>

              <div className="divider" />

              <div className="pdp-meta">
                <p className="meta-item">
                  {product.brand && <><strong>Brand:</strong> {product.brand} | </>}
                  {product.color && <><strong>Color:</strong> {product.color} | </>}
                  {product.size && <><strong>Size:</strong> {product.size} | </>}
                  {product.category?.name && <><strong>Category:</strong> {product.category.name} | </>}
                  {product.subcategory?.name && <><strong>Subcategory:</strong> {product.subcategory.name}</>}
                </p>
              </div>

              <div className="divider" />

              <div>
                <h3 className="pdp-desc-title">Description</h3>
                <p className="pdp-desc-text">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="pdp-actions">
                <button className="buy-btn">Buy Now</button>
                <button className="cart-btn">Add to Cart</button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default ProductDetail;