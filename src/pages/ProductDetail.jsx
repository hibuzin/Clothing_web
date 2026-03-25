import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(id || "");

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(""); // "next" | "prev"

  // freeze cards during animation
  const [cards, setCards] = useState({
    main: null,
    next: null,
    prev: null,
    index: -1,
  });

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

  useEffect(() => {
    if (id) setActiveId(id);
  }, [id]);

  useEffect(() => {
    if (!loading && allProducts.length > 0 && !activeId) {
      setActiveId(allProducts[0]._id);
    }
  }, [loading, allProducts, activeId]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const activeIndex = useMemo(() => {
    return allProducts.findIndex((item) => item._id === activeId);
  }, [allProducts, activeId]);

  const activeProduct = useMemo(() => {
    return allProducts.find((item) => item._id === activeId);
  }, [allProducts, activeId]);

  const prevProduct = useMemo(() => {
    if (!allProducts.length || activeIndex === -1) return null;
    const prevIndex =
      activeIndex === 0 ? allProducts.length - 1 : activeIndex - 1;
    return allProducts[prevIndex];
  }, [allProducts, activeIndex]);

  const nextProduct = useMemo(() => {
    if (!allProducts.length || activeIndex === -1) return null;
    const nextIndex =
      activeIndex === allProducts.length - 1 ? 0 : activeIndex + 1;
    return allProducts[nextIndex];
  }, [allProducts, activeIndex]);

  useEffect(() => {
    if (!animating && activeProduct) {
      setCards({
        main: activeProduct,
        next: nextProduct,
        prev: prevProduct,
        index: activeIndex,
      });
    }
  }, [animating, activeProduct, nextProduct, prevProduct, activeIndex]);

  const startSwap = (type) => {
    if (animating) return;

    setCards({
      main: activeProduct,
      next: nextProduct,
      prev: prevProduct,
      index: activeIndex,
    });

    setDirection(type);
    setAnimating(true);

    setTimeout(() => {
      if (type === "next" && nextProduct) {
        setActiveId(nextProduct._id);
        navigate(`/product/${nextProduct._id}`, { replace: true });
      }

      if (type === "prev" && prevProduct) {
        setActiveId(prevProduct._id);
        navigate(`/product/${prevProduct._id}`, { replace: true });
      }

      setAnimating(false);
      setDirection("");
    }, 550);
  };

  const visibleMain = animating ? cards.main : activeProduct;
  const visibleNext = animating ? cards.next : nextProduct;
  const visiblePrev = animating ? cards.prev : prevProduct;
  const visibleIndex = animating ? cards.index : activeIndex;

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
          padding: 18px 20px 20px;
          background: #ffffff;
          overflow: hidden;
        }

        .pdp-title {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #111827;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pdp-loading,
        .pdp-empty {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-top: 100px;
        }

        .showcase-layout {
          position: relative;
          width: 100%;
          min-height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-product,
        .next-preview,
        .prev-preview {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.55s ease;
          will-change: transform, opacity;
        }

        /* DEFAULT POSITIONS */
        .main-product {
          width: 100%;
          max-width: 360px;
          z-index: 3;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1);
        }

        .next-preview {
          top: 20px;
          right: 30px;
          width: 140px;
          z-index: 2;
          cursor: pointer;
          transform: translate(0, 0) scale(1);
        }

        .prev-preview {
          bottom: 20px;
          left: 30px;
          width: 140px;
          z-index: 2;
          cursor: pointer;
          transform: translate(0, 0) scale(1);
        }

        /* NEXT CLICK:
           next -> center
           main -> prev
           prev -> fade out
        */
        .showcase-layout.swap-next .next-preview {
          transform: translate(-320px, 180px) scale(2.45);
          z-index: 5;
          opacity: 1;
        }

        .showcase-layout.swap-next .main-product {
          transform: translate(-185%, 38%) scale(0.42);
          z-index: 4;
          opacity: 0.95;
        }

        .showcase-layout.swap-next .prev-preview {
          opacity: 0;
          transform: translate(-30px, 20px) scale(0.8);
        }

        /* PREV CLICK:
           prev -> center
           main -> next
           next -> fade out
        */
        .showcase-layout.swap-prev .prev-preview {
          transform: translate(320px, -180px) scale(2.45);
          z-index: 5;
          opacity: 1;
        }

        .showcase-layout.swap-prev .main-product {
          transform: translate(85%, -138%) scale(0.42);
          z-index: 4;
          opacity: 0.95;
        }

        .showcase-layout.swap-prev .next-preview {
          opacity: 0;
          transform: translate(30px, -20px) scale(0.8);
        }

        .main-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ffffff;
          background: #111827;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .preview-label {
          font-size: 9px;
          font-weight: 700;
          color: #6b7280;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .main-image {
          width: 100%;
          height: 420px;
          object-fit: contain;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          padding: 14px;
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
        }

        .preview-image {
          width: 100%;
          height: 140px;
          object-fit: contain;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          padding: 8px;
          border-radius: 12px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
        }

        .main-name {
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          text-transform: capitalize;
          text-align: center;
          background: #f3f4f6;
          padding: 8px 12px;
          border-radius: 8px;
          width: 100%;
        }

        .main-price {
          font-size: 18px;
          font-weight: 800;
          color: #111827;
        }

        .preview-name {
          font-size: 10px;
          font-weight: 600;
          color: #111827;
          text-transform: capitalize;
          text-align: center;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: #f3f4f6;
          padding: 5px 8px;
          border-radius: 6px;
        }

        .arrow-controls {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          padding: 0 20px;
        }

        .arrow-btn {
          width: 48px;
          height: 48px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .arrow-btn:hover:not(:disabled) {
          background: #111827;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .arrow-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* TABLET */
        @media (max-width: 1024px) {
          .main-product {
            max-width: 320px;
          }

          .main-image {
            height: 360px;
          }

          .next-preview,
          .prev-preview {
            width: 120px;
          }

          .preview-image {
            height: 110px;
          }

          .showcase-layout.swap-next .next-preview {
            transform: translate(-260px, 150px) scale(2.2);
          }

          .showcase-layout.swap-prev .prev-preview {
            transform: translate(260px, -150px) scale(2.2);
          }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .pdp {
            padding: 16px 12px 20px;
          }

          .showcase-layout {
            min-height: 540px;
          }

          .main-product {
            max-width: 240px;
          }

          .main-image {
            height: 270px;
            padding: 10px;
          }

          .next-preview,
          .prev-preview {
            width: 85px;
          }

          .next-preview {
            top: 20px;
            right: 10px;
          }

          .prev-preview {
            bottom: 20px;
            left: 10px;
          }

          .preview-image {
            height: 80px;
            padding: 5px;
          }

          .preview-name,
          .preview-label {
            display: none;
          }

          .showcase-layout.swap-next .next-preview {
            transform: translate(-145px, 125px) scale(2.35);
          }

          .showcase-layout.swap-next .main-product {
            transform: translate(-160%, 55%) scale(0.36);
          }

          .showcase-layout.swap-prev .prev-preview {
            transform: translate(145px, -125px) scale(2.35);
          }

          .showcase-layout.swap-prev .main-product {
            transform: translate(65%, -150%) scale(0.36);
          }

          .arrow-controls {
            padding: 0 5px;
          }

          .arrow-btn {
            width: 42px;
            height: 42px;
            font-size: 13px;
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
            <div
              className={`showcase-layout ${
                direction ? `swap-${direction}` : ""
              }`}
            >
              {visibleNext && (
                <div
                  className="next-preview"
                  onClick={!animating ? () => startSwap("next") : undefined}
                >
                  <span className="preview-label">Next</span>
                  <img
                    src={visibleNext.image}
                    alt={visibleNext.name}
                    className="preview-image"
                  />
                  <span className="preview-name">{visibleNext.name}</span>
                </div>
              )}

              {visibleMain && (
                <div className="main-product">
                  <span className="main-badge">Product {visibleIndex + 1}</span>

                  <img
                    src={visibleMain.image}
                    alt={visibleMain.name}
                    className="main-image"
                  />

                  <span className="main-name">{visibleMain.name}</span>
                  <span className="main-price">₹{visibleMain.price}</span>
                </div>
              )}

              {visiblePrev && (
                <div
                  className="prev-preview"
                  onClick={!animating ? () => startSwap("prev") : undefined}
                >
                  <span className="preview-label">Previous</span>
                  <img
                    src={visiblePrev.image}
                    alt={visiblePrev.name}
                    className="preview-image"
                  />
                  <span className="preview-name">{visiblePrev.name}</span>
                </div>
              )}
            </div>

            <div className="arrow-controls">
              <button
                className="arrow-btn"
                onClick={() => startSwap("prev")}
                aria-label="Previous Product"
                disabled={animating}
              >
                <FaArrowLeft />
              </button>

              <button
                className="arrow-btn"
                onClick={() => startSwap("next")}
                aria-label="Next Product"
                disabled={animating}
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