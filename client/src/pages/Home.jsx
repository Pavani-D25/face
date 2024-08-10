// src/pages/Home.jsx
import React, { useState } from 'react';
import FaceDetection from '../components/FaceDetection';

const Home = () => {
  const [showFaceDetection, setShowFaceDetection] = useState(false);

  const handleGetStarted = () => {
    setShowFaceDetection(true);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Face Detection App</h1>
      {!showFaceDetection && (
        <button onClick={handleGetStarted}>Get Started</button>
      )}
      {showFaceDetection && <FaceDetection />}
    </div>
  );
};

export default Home;
