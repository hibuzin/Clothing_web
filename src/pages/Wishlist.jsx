import React from "react";

function Wishlist() {
  return (
    <>
      <style>{`
        .wishlist-page {
          min-height: 100vh;
          background: #f9fafb;
          padding: 30px 20px 100px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .wishlist-card {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .wishlist-title {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 20px;
        }

        .wishlist-empty {
          font-size: 16px;
          color: #6b7280;
          padding: 30px 0;
        }
      `}</style>

      <div className="wishlist-page">
        <div className="wishlist-card">
          <h2 className="wishlist-title">My Wishlist</h2>
          <p className="wishlist-empty">Your wishlist is empty ❤️</p>
        </div>
      </div>
    </>
  );
}

export default Wishlist;