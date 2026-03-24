import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(id || "");

  const scrollRef = useRef(null);
  const productRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://clothing-backend-7.onrender.com/api/products/"
        );
        const data = await response.json();
        setAllProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // route sync
  useEffect(() => {
    if (id) {
      setActiveId(id);
    }
  }, [id]);

  // fallback active product
  useEffect(() => {
    if (!loading && allProducts.length > 0 && !activeId) {
      const firstId = allProducts[0]._id;
      setActiveId(firstId);
    }
  }, [loading, allProducts, activeId]);

  const activeIndex = useMemo(() => {
    return allProducts.findIndex((item) => item._id === activeId);
  }, [allProducts, activeId]);

  // active product center-ku smooth scroll
  useEffect(() => {
    if (!allProducts.length || activeIndex === -1) return;

    const activeCard = productRefs.current[activeIndex];
    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex, allProducts]);

  const handleProductClick = (productId) => {
    setActiveId(productId); // instant UI update
    navigate(`/product/${productId}`); // route update
  };

  const handlePrev = () => {
    if (!allProducts.length) return;

    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const prevIndex =
      currentIndex === 0 ? allProducts.length - 1 : currentIndex - 1;

    const prevProduct = allProducts[prevIndex];
    if (prevProduct) {
      setActiveId(prevProduct._id);
      navigate(`/product/${prevProduct._id}`);
    }
  };

  const handleNext = () => {
    if (!allProducts.length) return;

    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex =
      currentIndex === allProducts.length - 1 ? 0 : currentIndex + 1;

    const nextProduct = allProducts[nextIndex];
    if (nextProduct) {
      setActiveId(nextProduct._id);
      navigate(`/product/${nextProduct._id}`);
    }
  };

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
          background:
            radial-gradient(circle at top left, rgba(76, 29, 149, 0.28), transparent 28%),
            radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 28%),
            radial-gradient(circle at bottom center, rgba(139, 92, 246, 0.12), transparent 40%),
            linear-gradient(135deg, #020617, #0f172a, #1e1b4b, #111827);
          padding: 40px 16px 60px;
          overflow: hidden;
        }

        .pdp-title {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 24px;
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

        /* SCROLL AREA */
        .scroll-container {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 20px 0;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .products-row {
          display: flex;
          align-items: flex-start;
          gap: 28px;
          width: max-content;
          padding: 0 calc(50vw - 160px);
        }

        .product-card {
          flex: 0 0 auto;
          width: 320px;
          max-width: 320px;
          min-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.35s ease, opacity 0.35s ease;
          opacity: 0.45;
          transform: scale(0.92);
        }

        .product-card:hover {
          opacity: 0.8;
          transform: scale(0.96);
        }

        .active-product {
          opacity: 1;
          transform: scale(1);
        }

        .product-image {
          width: 100%;
          height: 430px;
          object-fit: contain;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 14px;
          display: block;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease;
          backdrop-filter: blur(6px);
        }

        .product-card:hover .product-image {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
        }

        .active-product .product-image {
          border: 2px solid #ffffff;
          box-shadow: 0 12px 30px rgba(255, 255, 255, 0.14);
          transform: scale(1.02);
        }

        .badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 2px;
        }

        .product-name {
          font-size: 11px;
          font-weight: 600;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.45);
          padding: 6px 10px;
          letter-spacing: 0.5px;
          text-transform: capitalize;
          max-width: 100%;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          border-radius: 4px;
        }

        /* ARROWS */
        .arrow-controls {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 22px;
          padding: 0 20px;
        }

        .arrow-btn {
          width: 48px;
          height: 48px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(6px);
        }

        .arrow-btn:hover {
          background: #ffffff;
          color: #0f172a;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 768px) {
          .pdp {
            padding: 28px 12px 40px;
          }

          .scroll-container {
            padding: 16px 0;
          }

          .products-row {
            gap: 16px;
            padding: 0 calc(50vw - 90px);
          }

          .product-card {
            width: 180px;
            min-width: 180px;
            max-width: 180px;
            opacity: 0.5;
            transform: scale(0.9);
          }

          .active-product {
            opacity: 1;
            transform: scale(1);
          }

          .product-image {
            width: 100%;
            height: 230px;
            padding: 8px;
          }

          .product-name {
            font-size: 9px;
            width: 100%;
          }

          .arrow-controls {
            margin-top: 18px;
            padding: 0 8px;
          }

          .arrow-btn {
            width: 42px;
            height: 42px;
            font-size: 14px;
          }
        }
      `}</style>

      <section className="pdp">
        <div className="pdp-title">Luxury Collection</div>

        {loading ? (
          <p className="pdp-loading">Loading...</p>
        ) : allProducts.length === 0 ? (
          <p className="pdp-empty">No products found</p>
        ) : (
          <>
            <div className="scroll-container" ref={scrollRef}>
              <div className="products-row">
                {allProducts.map((item, index) => (
                  <div
                    key={item._id}
                    ref={(el) => (productRefs.current[index] = el)}
                    className={`product-card ${
                      item._id === activeId ? "active-product" : ""
                    }`}
                    onClick={() => handleProductClick(item._id)}
                  >
                    <span className="badge">Product {index + 1}</span>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />

                    <span className="product-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Arrow Controls */}
            <div className="arrow-controls">
              <button
                className="arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Product"
              >
                <FaArrowLeft />
              </button>

              <button
                className="arrow-btn"
                onClick={handleNext}
                aria-label="Next Product"
              >
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default ProductDetail;