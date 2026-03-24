import React from "react";

function Banner() {
  return (
    <>
      <style>{`
        .banner-section {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 10px;
          padding: 0 20px;
        }

        .banner-box {
          width: 100%;
          max-width: 1200px;
          height: 320px;
          border-radius: 20px;
          background: linear-gradient(135deg, #111827, #374151);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 40px 50px;
          color: white;
          overflow: hidden;
        }

        .banner-content {
          max-width: 500px;
        }

        .banner-subtitle {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
          margin-bottom: 12px;
        }

        .banner-title {
          font-size: 42px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 14px;
        }

        .banner-text {
          font-size: 16px;
          opacity: 0.85;
          margin-bottom: 22px;
          line-height: 1.6;
        }

        .banner-btn {
          border: none;
          outline: none;
          background: white;
          color: #111827;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .banner-btn:hover {
          transform: translateY(-2px);
        }

        .banner-image {
          width: 260px;
          height: 260px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 600;
          text-align: center;
          padding: 20px;
        }

        @media (max-width: 900px) {
          .banner-box {
            flex-direction: column;
            justify-content: center;
            text-align: center;
            height: auto;
            gap: 30px;
            padding: 35px 25px;
          }

          .banner-title {
            font-size: 32px;
          }

          .banner-image {
            width: 100%;
            max-width: 260px;
            height: 180px;
          }
        }
      `}</style>

      <section className="banner-section">
        <div className="banner-box">
          <div className="banner-content">
            <p className="banner-subtitle">New Arrival</p>
            <h1 className="banner-title">Discover Your Style</h1>
            <p className="banner-text">
              Explore the latest fashion collections for men, women, boys, and girls.
            </p>
            <button className="banner-btn">Shop Now</button>
          </div>

          <div className="banner-image">Fashion Banner</div>
        </div>
      </section>
    </>
  );
}

export default Banner;