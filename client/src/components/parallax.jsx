import React, { useState, useEffect } from "react";
import Plx from "react-plx";
import { useNavigate } from "react-router-dom";
import "./parallax.css";

const ParallaxEffect = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const handleButtonClick = () => {
    navigate("/screen");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 400) {
        setShowButton(true); // Show button after text fades out
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position on render

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: "200vh" }}> {/* Set height to allow scrolling */}
      
      {/* Parallax Background */}
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 700,
            properties: [
              {
                startValue: 1,
                endValue: 1.6,
                property: "scale",
              },
            ],
          },
        ]}
        style={{
          position: "absolute", // Changed to absolute for scrolling
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 1, // Maintain correct z-index
        }}
      >
        <img style={{ width: "100%" }} src="/images/bg.png" alt="Foreground" />
      </Plx>

      {/* Parallax Background Image */}
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 800,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: "scale",
              },
            ],
          },
        ]}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100vh", // Fill viewport height
          zIndex: 0,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="/images/background.jpg"
          alt="Background"
        />
      </Plx>

      {/* Text Image with Fade-out */}
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 400,
            properties: [
              {
                startValue: 1,
                endValue: 0,
                property: "opacity",
              },
            ],
          },
        ]}
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <img
          style={{
            width: "30vw",
          }}
          src="/images/text-img.png"
          alt="Text"
        />
      </Plx>

      {/* Button */}
      {showButton && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "60%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          <button className="get-started-button" onClick={handleButtonClick}>
            Get Started
          </button>
        </div>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 0, // Content below parallax effects
          paddingTop: "56%", // Extend page height
        }}
      >
        <div style={{ background: "#000", height: "100vh" }}></div>
      </div>
    </div>
  );
};

export default ParallaxEffect;
