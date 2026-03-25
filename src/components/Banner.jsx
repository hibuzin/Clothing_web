import React, { useEffect, useState, useRef } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";

function BannerSlider() {
  const images = [banner1, banner2, banner3, banner4];
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const isJumping = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isJumping.current) {
        setTransition(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      isJumping.current = true;
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(1);
        setTimeout(() => {
          isJumping.current = false;
          setTransition(true);
        }, 50);
      }, 700);
    }

    if (currentIndex === 0) {
      isJumping.current = true;
      setTimeout(() => {
        setTransition(false);
        setCurrentIndex(extendedImages.length - 2);
        setTimeout(() => {
          isJumping.current = false;
          setTransition(true);
        }, 50);
      }, 700);
    }
  }, [currentIndex, extendedImages.length]);

  const realIndex =
    currentIndex === 0
      ? images.length - 1
      : currentIndex === extendedImages.length - 1
      ? 0
      : currentIndex - 1;

  return (
    <>
      <style>{`
        .slider-section {
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .slider-container {
          width: 100%;
          height: 400px;
          overflow: hidden;
          position: relative;
          margin: 0;
          padding: 0;
        }

        .slider-track {
          display: flex;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .slider-slide {
          min-width: 100%;
          height: 100%;
          flex-shrink: 0;
        }

        .slider-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .slider-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.45);
          transition: all 0.3s ease;
        }

        .slider-dot.active {
          background: #fff;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .slider-container {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .slider-container {
            height: 180px;
          }
        }
      `}</style>

      <section className="slider-section">
        <div className="slider-container">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: transition ? "transform 0.7s ease-in-out" : "none",
            }}
          >
            {extendedImages.map((image, index) => (
              <div className="slider-slide" key={index}>
                <img src={image} alt={`Slide ${index}`} />
              </div>
            ))}
          </div>

          <div className="slider-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`slider-dot ${index === realIndex ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSlider;