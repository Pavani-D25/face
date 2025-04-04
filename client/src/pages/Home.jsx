// // src/pages/Home.jsx
// import { useState } from 'react';
// import FaceDetection from '../components/FaceDetection';

// const Home = () => {
//   const [showFaceDetection, setShowFaceDetection] = useState(false);

//   const handleGetStarted = () => {
//     setShowFaceDetection(true);
//   };

//   return (
//     <div className="home-container">
//       <h1 >Welcome to Face Detection App</h1>
//       {!showFaceDetection && (
//         <button onClick={handleGetStarted}>Get Started</button>
//       )}
//       {showFaceDetection && <FaceDetection />}
//     </div>
//   );
// };

// export default Home;



// ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????




// // src/pages/Home.jsx
// import { useState } from 'react';
// import FaceDetection from '../components/FaceDetection';

// const Home = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [scanResults, setScanResults] = useState(null);

//   return (
//     <div style={desktopAppStyle}>
//       {!isScanning ? (
//         <div style={welcomeScreenStyle}>
//           <h1 style={titleStyle}>NEURAL FACE SCAN</h1>
//           <p style={subtitleStyle}>Advanced Biometric Analysis System</p>
          
//           <button
//             onClick={() => setIsScanning(true)}
//             style={startButtonStyle}
//           >
//             INITIATE FACE SCAN
//           </button>
          
//           {scanResults && (
//             <div style={previousResultsStyle}>
//               <h3>LAST SCAN RESULTS</h3>
//               <div style={resultsGridStyle}>
//                 <ResultCard label="Age" value={scanResults.age} />
//                 <ResultCard label="Gender" value={scanResults.gender} />
//                 <ResultCard label="Emotion" value={scanResults.emotion} />
//                 <ResultCard label="Time" value={scanResults.timestamp} />
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <FaceDetection 
//           onCapture={setScanResults}
//           onClose={() => setIsScanning(false)}
//         />
//       )}
//     </div>
//   );
// };

// const ResultCard = ({ label, value }) => (
//   <div style={resultCardStyle}>
//     <div style={resultLabelStyle}>{label}</div>
//     <div style={resultValueStyle}>{value}</div>
//   </div>
// );

// // Styles
// const desktopAppStyle = {
//   width: '100vw',
//   height: '100vh',
//   backgroundColor: '#0a0a12',
//   color: '#e0e0ff',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontFamily: '"Segoe UI", "Roboto", sans-serif',
//   overflow: 'hidden'
// };

// const welcomeScreenStyle = {
//   textAlign: 'center',
//   maxWidth: '800px',
//   padding: '40px',
//   borderRadius: '8px',
//   background: 'rgba(20, 20, 40, 0.5)',
//   boxShadow: '0 0 40px rgba(0, 200, 255, 0.1)'
// };

// const titleStyle = {
//   fontSize: '3rem',
//   background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   marginBottom: '1rem',
//   letterSpacing: '2px'
// };

// const subtitleStyle = {
//   fontSize: '1.2rem',
//   color: 'rgba(200, 220, 255, 0.8)',
//   marginBottom: '3rem',
//   fontWeight: '300'
// };

// const startButtonStyle = {
//   padding: '15px 40px',
//   fontSize: '1.2rem',
//   background: 'linear-gradient(135deg, #00ffff, #8a2be2)',
//   color: 'white',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   boxShadow: '0 4px 20px rgba(0, 200, 255, 0.3)',
//   transition: 'all 0.3s',
//   fontWeight: 'bold',
//   ':hover': {
//     transform: 'translateY(-3px)',
//     boxShadow: '0 6px 25px rgba(138, 43, 226, 0.4)'
//   }
// };

// const previousResultsStyle = {
//   marginTop: '40px',
//   padding: '20px',
//   background: 'rgba(30, 30, 60, 0.5)',
//   borderRadius: '8px',
//   border: '1px solid rgba(100, 200, 255, 0.1)'
// };

// const resultsGridStyle = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(2, 1fr)',
//   gap: '15px',
//   marginTop: '15px'
// };

// const resultCardStyle = {
//   background: 'rgba(40, 40, 80, 0.3)',
//   padding: '15px',
//   borderRadius: '6px',
//   borderLeft: '3px solid #00ffff'
// };

// const resultLabelStyle = {
//   color: '#8a2be2',
//   fontSize: '0.9rem',
//   marginBottom: '5px'
// };

// const resultValueStyle = {
//   fontSize: '1.3rem',
//   fontWeight: 'bold'
// };

// export default Home;





// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????















// src/pages/Home.jsx
import { useState } from 'react';
import FaceDetection from '../components/FaceDetection';

const Home = () => {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0a0a12',
      color: '#e0e0ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '"Segoe UI", "Roboto", sans-serif'
    }}>
      {!isScanning ? (
        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: '40px',
          borderRadius: '8px',
          background: 'rgba(20, 20, 40, 0.5)',
          boxShadow: '0 0 30px rgba(0, 200, 255, 0.1)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            FACE ECHO
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(200, 220, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            Advanced facial recognition for desktop
          </p>
          <button
            onClick={() => setIsScanning(true)}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #00ffff, #8a2be2)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 200, 255, 0.3)',
              transition: 'all 0.3s',
              fontWeight: 'bold',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(138, 43, 226, 0.4)'
              }
            }}
          >
            START SCANNING
          </button>
        </div>
      ) : (
        <FaceDetection onClose={() => setIsScanning(false)} />
      )}
    </div>
  );
};

export default Home;