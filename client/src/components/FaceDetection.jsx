





// // src/components/FaceDetection.jsx

// import  { useEffect, useRef } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceDetection.css'; // Assuming you save the CSS in this file

// const FaceDetection = () => {
//   const videoRef = useRef();
//   const canvasRef = useRef();

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = `${import.meta.env.BASE_URL}models`;

//       await Promise.all([
//         faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//         faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//         faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//         faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//         faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
//       ]);

//       startVideo();
//     };

//     const startVideo = () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: false })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((error) => console.error(error));
//     };

//     const onPlay = () => {
//       const video = videoRef.current;
//       const canvas = faceapi.createCanvasFromMedia(video);
//       canvasRef.current = canvas;
      
//       const container = video.parentElement;
//       container.appendChild(canvas);

//       const displaySize = { width: video.videoWidth, height: video.videoHeight };
//       faceapi.matchDimensions(canvas, displaySize);

//       setInterval(async () => {
//         const detections = await faceapi
//           .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceExpressions()
//           .withAgeAndGender();

//         const resizedDetections = faceapi.resizeResults(detections, displaySize);

//         const context = canvas.getContext('2d');
//         context.clearRect(0, 0, canvas.width, canvas.height);

//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//         resizedDetections.forEach(detection => {
//           const box = detection.detection.box;
//           const drawBox = new faceapi.draw.DrawBox(box, {
//             label: `${Math.round(detection.age)} year old ${detection.gender}`,
//           });
//           drawBox.draw(canvas);
//         });

//         console.log(detections);
//       }, 100);
//     };

//     if (videoRef.current) {
//       videoRef.current.addEventListener('play', onPlay);
//     }

//     loadModels();

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener('play', onPlay);
//       }
//     };
//   }, []);

//   return (
//     <div style={{ position: 'relative', width: '640px', height: '480px' }}>
//       <video ref={videoRef} id="video" width="640" height="480" autoPlay muted style={{ position: 'absolute', top: 0, left: 0 }} />
//       <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
//     </div>
//   );
// };

// export default FaceDetection;


// ????????????????????????????????????????????????????????????????????????????????????????????????????


// // src/components/FaceDetection.jsx
// import { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceDetection = ({ onCapture, onClose }) => {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [detections, setDetections] = useState(null);
//   const [isModelsLoading, setIsModelsLoading] = useState(true);
//   const [scanProgress, setScanProgress] = useState(0);

//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = `${import.meta.env.BASE_URL}models`;
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
//         ]);
//         setIsModelsLoading(false);
//         startVideo();
//       } catch (error) {
//         console.error("Model loading error:", error);
//       }
//     };

//     const startVideo = () => {
//       navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//           videoRef.current.srcObject = stream;
//           simulateScanProgress();
//         })
//         .catch(err => console.error("Camera error:", err));
//     };

//     const simulateScanProgress = () => {
//       const interval = setInterval(() => {
//         setScanProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             return 100;
//           }
//           return prev + 10;
//         });
//       }, 200);
//     };

//     const detectFaces = async () => {
//       if (!videoRef.current || isModelsLoading) return;

//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const displaySize = { width: video.width, height: video.height };

//       faceapi.matchDimensions(canvas, displaySize);
      
//       const results = await faceapi
//         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions()
//         .withAgeAndGender();

//       setDetections(results);
      
//       const resizedDetections = faceapi.resizeResults(results, displaySize);
//       const ctx = canvas.getContext('2d');
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//       resizedDetections.forEach(detection => {
//         const box = detection.detection.box;
//         const drawBox = new faceapi.draw.DrawBox(box, {
//           label: `${Math.round(detection.age)} year old ${detection.gender}`,
//         });
//         drawBox.draw(canvas);
//       });
//     };

//     loadModels();
//     const detectionInterval = setInterval(detectFaces, 100);

//     return () => {
//       clearInterval(detectionInterval);
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [isModelsLoading]);

//   const handleCapture = () => {
//     if (detections?.[0]) {
//       const { age, gender, expressions } = detections[0];
//       onCapture({
//         age: Math.round(age),
//         gender,
//         emotion: Object.entries(expressions)
//           .sort((a, b) => b[1] - a[1])[0][0],
//         timestamp: new Date().toLocaleTimeString()
//       });
//     }
//   };

//   return (
//     <div style={{
//       position: 'relative',
//       width: '800px',
//       height: '600px',
//       backgroundColor: '#0a0a12',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)'
//     }}>
//       {/* Video Feed */}
//       <video
//         ref={videoRef}
//         width="800"
//         height="600"
//         autoPlay
//         muted
//         style={{
//           objectFit: 'cover',
//           transform: 'scaleX(-1)',
//           opacity: isModelsLoading ? 0.5 : 1
//         }}
//       />
      
//       {/* Canvas Overlay */}
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           transform: 'scaleX(-1)'
//         }}
//       />
      
//       {/* UI Controls */}
//       <div style={{
//         position: 'absolute',
//         bottom: '20px',
//         left: 0,
//         right: 0,
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '20px'
//       }}>
//         <button
//           onClick={onClose}
//           style={desktopButtonStyle}
//         >
//           Close Scanner
//         </button>
        
//         <button
//           onClick={handleCapture}
//           disabled={!detections || scanProgress < 100}
//           style={{
//             ...desktopButtonStyle,
//             background: scanProgress < 100 
//               ? '#333' 
//               : 'linear-gradient(135deg, #00ffff, #8a2be2)',
//             cursor: scanProgress < 100 ? 'not-allowed' : 'pointer'
//           }}
//         >
//           {scanProgress < 100 ? (
//             `Initializing... ${scanProgress}%`
//           ) : (
//             'Capture Analysis'
//           )}
//         </button>
//       </div>
      
//       {/* Scanning Effects */}
//       {isModelsLoading && (
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: 'rgba(0, 0, 20, 0.7)',
//           color: '#00ffff',
//           fontSize: '18px'
//         }}>
//           Loading AI Models...
//         </div>
//       )}
//     </div>
//   );
// };

// const desktopButtonStyle = {
//   padding: '12px 24px',
//   borderRadius: '4px',
//   border: 'none',
//   color: 'white',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   fontSize: '14px',
//   transition: 'all 0.2s',
//   boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
//   ':hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 4px 15px rgba(0, 200, 255, 0.4)'
//   }
// };

// export default FaceDetection;

// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????




// import { useState, useRef, useEffect } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceDetection = ({ onClose }) => {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [detections, setDetections] = useState(null);
//   const [capturedData, setCapturedData] = useState(null);
//   const [isModelsLoading, setIsModelsLoading] = useState(true);

//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = `${import.meta.env.BASE_URL}models`;
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
//         ]);
//         startVideo();
//         setIsModelsLoading(false);
//       } catch (error) {
//         console.error("Model loading error:", error);
//       }
//     };

//     const startVideo = () => {
//       navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch(err => console.error("Camera error:", err));
//     };

//     const detectFaces = async () => {
//       if (!videoRef.current || isModelsLoading) return;

//       const results = await faceapi
//         .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions()
//         .withAgeAndGender();

//       setDetections(results);
//       updateCanvas(results);
//     };

//     const updateCanvas = (results) => {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const displaySize = { width: video.width, height: video.height };
      
//       faceapi.matchDimensions(canvas, displaySize);
//       const resizedDetections = faceapi.resizeResults(results, displaySize);
      
//       const ctx = canvas.getContext('2d');
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//     };

//     loadModels();
//     const detectionInterval = setInterval(detectFaces, 100);

//     return () => {
//       clearInterval(detectionInterval);
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [isModelsLoading]);

//   const handleCapture = () => {
//     if (detections?.[0]) {
//       const { age, gender, expressions } = detections[0];
//       setCapturedData({
//         age: Math.round(age),
//         gender,
//         emotion: Object.entries(expressions)
//           .sort((a, b) => b[1] - a[1])[0][0],
//         timestamp: new Date().toLocaleTimeString()
//       });
//     }
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       height: '100vh',
//       backgroundColor: '#0a0a12'
//     }}>
//       {/* Main Scanner Area */}
//       <div style={{
//         flex: 3,
//         position: 'relative',
//         backgroundColor: '#000'
//       }}>
//         <video
//           ref={videoRef}
//           width="100%"
//           height="100%"
//           autoPlay
//           muted
//           style={{
//             objectFit: 'cover',
//             transform: 'scaleX(-1)',
//             opacity: isModelsLoading ? 0.5 : 1
//           }}
//         />
        
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             transform: 'scaleX(-1)'
//           }}
//         />
        
//         {isModelsLoading && (
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'rgba(0, 0, 20, 0.7)',
//             color: '#00ffff',
//             fontSize: '18px'
//           }}>
//             Loading AI Models...
//           </div>
//         )}
        
//         <div style={{
//           position: 'absolute',
//           bottom: '20px',
//           left: '20px',
//           display: 'flex',
//           gap: '10px'
//         }}>
//           <button
//             onClick={onClose}
//             style={buttonStyle}
//           >
//             Close
//           </button>
          
//           <button
//             onClick={handleCapture}
//             disabled={!detections}
//             style={{
//               ...buttonStyle,
//               background: !detections ? '#333' : 'linear-gradient(135deg, #00ffff, #8a2be2)',
//               cursor: !detections ? 'not-allowed' : 'pointer'
//             }}
//           >
//             Capture
//           </button>
//         </div>
//       </div>
      
//       {/* Results Sidebar */}
//       <div style={{
//         flex: 1,
//         padding: '20px',
//         backgroundColor: '#121220',
//         borderLeft: '1px solid rgba(100, 200, 255, 0.1)',
//         overflowY: 'auto'
//       }}>
//         <h3 style={{
//           color: '#00ffff',
//           marginBottom: '20px',
//           paddingBottom: '10px',
//           borderBottom: '1px solid rgba(100, 200, 255, 0.2)'
//         }}>
//           CAPTURE RESULTS
//         </h3>
        
//         {capturedData ? (
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '15px'
//           }}>
//             <DetailCard label="Age" value={capturedData.age} />
//             <DetailCard label="Gender" value={capturedData.gender} />
//             <DetailCard label="Emotion" value={capturedData.emotion} />
//             <DetailCard label="Timestamp" value={capturedData.timestamp} />
            
//             <button
//               onClick={() => setCapturedData(null)}
//               style={{
//                 ...buttonStyle,
//                 background: 'rgba(255, 50, 100, 0.7)',
//                 marginTop: '20px'
//               }}
//             >
//               Clear Results
//             </button>
//           </div>
//         ) : (
//           <div style={{
//             color: 'rgba(200, 220, 255, 0.6)',
//             fontStyle: 'italic',
//             textAlign: 'center',
//             marginTop: '40px'
//           }}>
//             No capture results yet. Click "Capture" to analyze current frame.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const DetailCard = ({ label, value }) => (
//   <div style={{
//     backgroundColor: 'rgba(30, 30, 60, 0.5)',
//     borderRadius: '6px',
//     padding: '15px',
//     borderLeft: '3px solid #8a2be2'
//   }}>
//     <div style={{
//       color: '#8a2be2',
//       fontSize: '0.8rem',
//       marginBottom: '5px'
//     }}>{label}</div>
//     <div style={{
//       color: 'white',
//       fontSize: '1.2rem',
//       fontWeight: 'bold'
//     }}>{value}</div>
//   </div>
// );

// const buttonStyle = {
//   padding: '10px 20px',
//   borderRadius: '4px',
//   border: 'none',
//   color: 'white',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   fontSize: '14px',
//   transition: 'all 0.2s',
//   boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//   ':hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 4px 8px rgba(0, 200, 255, 0.3)'
//   }
// };

// export default FaceDetection;














//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// import { useState, useRef, useEffect } from 'react';
// import * as faceapi from 'face-api.js';
// import { motion, AnimatePresence } from 'framer-motion';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';
// import { FiX, FiCamera, FiTrash2, FiLoader } from 'react-icons/fi';
// import NeonText from './NeonText'; // Custom component (see below)

// const FaceDetection = ({ onClose }) => {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [detections, setDetections] = useState(null);
//   const [capturedData, setCapturedData] = useState(null);
//   const [isModelsLoading, setIsModelsLoading] = useState(true);
//   const [scanProgress, setScanProgress] = useState(0);
//   const particlesInit = async (engine) => await loadFull(engine);

//   // Enhanced model loading with progress tracking
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = `${import.meta.env.BASE_URL}models`;
//         const models = [
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
//         ];

//         // Simulate progress for better UX
//         const totalModels = models.length;
//         let loadedModels = 0;
        
//         await Promise.all(models.map(modelPromise => 
//           modelPromise.then(() => {
//             loadedModels++;
//             setScanProgress(Math.round((loadedModels / totalModels) * 100));
//           })
//         ));
        
//         startVideo();
//         setIsModelsLoading(false);
//       } catch (error) {
//         console.error("Model loading error:", error);
//       }
//     };

//     const startVideo = () => {
//       navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//           videoRef.current.srcObject = stream;
//           // Add scanning animation
//           setTimeout(() => setScanProgress(100), 500);
//         })
//         .catch(err => console.error("Camera error:", err));
//     };

//     const detectFaces = async () => {
//       if (!videoRef.current || isModelsLoading) return;

//       const results = await faceapi
//         .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions()
//         .withAgeAndGender();

//       setDetections(results);
//       updateCanvas(results);
//     };

//     const updateCanvas = (results) => {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const displaySize = { width: video.width, height: video.height };
      
//       faceapi.matchDimensions(canvas, displaySize);
//       const resizedDetections = faceapi.resizeResults(results, displaySize);
      
//       const ctx = canvas.getContext('2d');
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       // Futuristic detection rendering
//       faceapi.draw.drawDetections(canvas, resizedDetections, {
//         lineWidth: 2,
//         boxColor: '#00ffff',
//         textColor: '#00ffff',
//         withScore: true
//       });
      
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections, {
//         lineWidth: 1,
//         color: '#8a2be2',
//         drawLines: true,
//         drawPoints: true
//       });
      
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections, 0.05, {
//         fontSize: 16,
//         fontStyle: 'bold',
//         textColor: '#ffffff'
//       });
//     };

//     loadModels();
//     const detectionInterval = setInterval(detectFaces, 100);

//     return () => {
//       clearInterval(detectionInterval);
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [isModelsLoading]);

//   const handleCapture = () => {
//     if (detections?.[0]) {
//       const { age, gender, expressions } = detections[0];
//       const primaryEmotion = Object.entries(expressions)
//         .sort((a, b) => b[1] - a[1])[0][0];
      
//       setCapturedData({
//         age: Math.round(age),
//         gender,
//         emotion: primaryEmotion,
//         timestamp: new Date().toLocaleTimeString(),
//         confidence: (expressions[primaryEmotion] * 100).toFixed(1) + '%'
//       });
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Interactive Particle Background */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           particles: {
//             number: { value: 80, density: { enable: true, value_area: 800 } },
//             color: { value: ["#00ffff", "#8a2be2"] },
//             shape: { type: "circle" },
//             opacity: { value: 0.5, random: true },
//             size: { value: 3, random: true },
//             line_linked: {
//               enable: true,
//               distance: 150,
//               color: "#8a2be2",
//               opacity: 0.4,
//               width: 1
//             },
//             move: {
//               enable: true,
//               speed: 2,
//               direction: "none",
//               random: true,
//               straight: false,
//               out_mode: "out",
//               bounce: false
//             }
//           },
//           interactivity: {
//             detect_on: "canvas",
//             events: {
//               onhover: { enable: true, mode: "repulse" },
//               onclick: { enable: true, mode: "push" }
//             }
//           }
//         }}
//       />

//       {/* Main Scanner Area */}
//       <motion.div 
//         style={styles.scannerArea}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div style={styles.videoContainer}>
//           <video
//             ref={videoRef}
//             style={styles.video}
//             autoPlay
//             muted
//           />
          
//           <canvas
//             ref={canvasRef}
//             style={styles.canvas}
//           />
          
//           {/* Scanning Grid Overlay */}
//           <div style={styles.scanGrid}>
//             <div style={styles.scanLines} />
//             <div style={{ ...styles.scanLines, transform: 'rotate(90deg)' }} />
//           </div>

//           {/* Loading State */}
//           {isModelsLoading && (
//             <motion.div 
//               style={styles.loadingOverlay}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <FiLoader style={styles.spinner} />
//               <NeonText text={`LOADING AI MODELS ${scanProgress}%`} />
//               <div style={styles.progressBar}>
//                 <motion.div 
//                   style={styles.progressFill}
//                   initial={{ width: 0 }}
//                   animate={{ width: `${scanProgress}%` }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* Control Panel */}
//         <motion.div 
//           style={styles.controlPanel}
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <motion.button
//             onClick={onClose}
//             style={styles.closeButton}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FiX /> TERMINATE
//           </motion.button>
          
//           <motion.button
//             onClick={handleCapture}
//             disabled={!detections}
//             style={{
//               ...styles.captureButton,
//               opacity: !detections ? 0.6 : 1,
//               cursor: !detections ? 'not-allowed' : 'pointer'
//             }}
//             whileHover={{ scale: detections ? 1.05 : 1 }}
//             whileTap={{ scale: detections ? 0.95 : 1 }}
//           >
//             <FiCamera /> CAPTURE ANALYSIS
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* Results Panel */}
//       <motion.div 
//         style={styles.resultsPanel}
//         initial={{ x: 100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <NeonText text="BIOMETRIC DATA" size="lg" />
        
//         <AnimatePresence>
//           {capturedData ? (
//             <motion.div
//               style={styles.resultsContainer}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <DataCard 
//                 label="AGE ESTIMATE" 
//                 value={capturedData.age} 
//                 unit="YEARS" 
//                 icon="👤"
//               />
//               <DataCard 
//                 label="GENDER" 
//                 value={capturedData.gender} 
//                 icon="⚧"
//               />
//               <DataCard 
//                 label="PRIMARY EMOTION" 
//                 value={capturedData.emotion} 
//                 confidence={capturedData.confidence}
//                 icon="😃"
//               />
//               <DataCard 
//                 label="TIMESTAMP" 
//                 value={capturedData.timestamp} 
//                 icon="⏱"
//               />
              
//               <motion.button
//                 onClick={() => setCapturedData(null)}
//                 style={styles.clearButton}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FiTrash2 /> CLEAR DATA
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div
//               style={styles.emptyState}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <NeonText text="NO DATA CAPTURED" size="md" />
//               <p style={styles.emptyText}>
//                 Initiate facial scan and capture to display biometric analysis
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// // Custom Data Card Component
// const DataCard = ({ label, value, unit, confidence, icon }) => (
//   <motion.div 
//     style={styles.dataCard}
//     whileHover={{ y: -5 }}
//     transition={{ type: 'spring', stiffness: 300 }}
//   >
//     <div style={styles.cardHeader}>
//       <span style={styles.cardIcon}>{icon}</span>
//       <NeonText text={label} size="sm" />
//     </div>
//     <div style={styles.cardValue}>
//       {value}
//       {unit && <span style={styles.cardUnit}> {unit}</span>}
//     </div>
//     {confidence && (
//       <div style={styles.confidenceBadge}>
//         CONFIDENCE: {confidence}
//       </div>
//     )}
//   </motion.div>
// );

// // Styles
// const styles = {
//   container: {
//     position: 'relative',
//     width: '100vw',
//     height: '100vh',
//     display: 'flex',
//     overflow: 'hidden',
//     background: 'radial-gradient(circle at center, #0f0c29 0%, #302b63 70%, #24243e 100%)'
//   },
//   scannerArea: {
//     flex: 3,
//     display: 'flex',
//     flexDirection: 'column',
//     padding: '2rem',
//     position: 'relative',
//     zIndex: 2
//   },
//   videoContainer: {
//     position: 'relative',
//     flex: 1,
//     borderRadius: '12px',
//     overflow: 'hidden',
//     boxShadow: '0 0 30px rgba(0, 200, 255, 0.3)',
//     border: '1px solid rgba(0, 200, 255, 0.2)'
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transform: 'scaleX(-1)'
//   },
//   canvas: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     transform: 'scaleX(-1)',
//     zIndex: 2
//   },
//   scanGrid: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 1,
//     pointerEvents: 'none',
//     background: 'linear-gradient(to bottom, transparent 49%, rgba(0, 200, 255, 0.1) 50%, transparent 51%)'
//   },
//   scanLines: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     background: 'linear-gradient(to right, transparent 49%, rgba(0, 200, 255, 0.1) 50%, transparent 51%)'
//   },
//   loadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: 'rgba(10, 10, 30, 0.8)',
//     zIndex: 3,
//     color: '#00ffff'
//   },
//   spinner: {
//     fontSize: '3rem',
//     marginBottom: '1rem',
//     animation: 'spin 2s linear infinite'
//   },
//   progressBar: {
//     width: '60%',
//     height: '6px',
//     background: 'rgba(0, 200, 255, 0.2)',
//     borderRadius: '3px',
//     marginTop: '1rem',
//     overflow: 'hidden'
//   },
//   progressFill: {
//     height: '100%',
//     background: 'linear-gradient(90deg, #00ffff, #8a2be2)',
//     borderRadius: '3px'
//   },
//   controlPanel: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '1rem',
//     marginTop: '1.5rem',
//     zIndex: 2
//   },
//   closeButton: {
//     padding: '0.8rem 1.5rem',
//     background: 'rgba(255, 50, 100, 0.7)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     fontSize: '0.9rem',
//     fontWeight: 'bold',
//     boxShadow: '0 0 15px rgba(255, 50, 100, 0.3)'
//   },
//   captureButton: {
//     padding: '0.8rem 1.5rem',
//     background: 'linear-gradient(135deg, #00ffff, #8a2be2)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     fontSize: '0.9rem',
//     fontWeight: 'bold',
//     boxShadow: '0 0 15px rgba(0, 200, 255, 0.3)'
//   },
//   resultsPanel: {
//     flex: 1,
//     padding: '2rem',
//     background: 'rgba(20, 20, 40, 0.7)',
//     backdropFilter: 'blur(10px)',
//     borderLeft: '1px solid rgba(0, 200, 255, 0.2)',
//     overflowY: 'auto',
//     zIndex: 2
//   },
//   resultsContainer: {
//     marginTop: '1.5rem',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem'
//   },
//   dataCard: {
//     background: 'rgba(30, 30, 60, 0.5)',
//     borderRadius: '8px',
//     padding: '1.2rem',
//     borderLeft: '3px solid #8a2be2',
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
//   },
//   cardHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     marginBottom: '0.5rem'
//   },
//   cardIcon: {
//     fontSize: '1.2rem'
//   },
//   cardValue: {
//     fontSize: '1.8rem',
//     fontWeight: 'bold',
//     color: 'white',
//     margin: '0.5rem 0'
//   },
//   cardUnit: {
//     fontSize: '1rem',
//     color: 'rgba(200, 220, 255, 0.7)'
//   },
//   confidenceBadge: {
//     display: 'inline-block',
//     padding: '0.3rem 0.6rem',
//     background: 'rgba(0, 200, 255, 0.2)',
//     borderRadius: '4px',
//     fontSize: '0.7rem',
//     color: '#00ffff'
//   },
//   emptyState: {
//     marginTop: '2rem',
//     textAlign: 'center',
//     color: 'rgba(200, 220, 255, 0.6)'
//   },
//   emptyText: {
//     marginTop: '1rem',
//     fontSize: '0.9rem'
//   },
//   clearButton: {
//     marginTop: '1.5rem',
//     padding: '0.8rem 1.5rem',
//     background: 'rgba(255, 50, 100, 0.3)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     fontSize: '0.9rem',
//     fontWeight: 'bold',
//     width: '100%',
//     justifyContent: 'center'
//   }
// };

// export default FaceDetection;




import { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import SongRecommendation from './SongRecommendation';
import './FaceDetection.css';

const FaceDetection = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState(null);
  const [capturedData, setCapturedData] = useState(null);
  const [isModelsLoading, setIsModelsLoading] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = `${import.meta.env.BASE_URL}models`;
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
        ]);
        startVideo();
        setIsModelsLoading(false);
      } catch (error) {
        console.error("Model loading error:", error);
      }
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          // Simulate loading progress
          const interval = setInterval(() => {
            setScanProgress(prev => (prev >= 100 ? 100 : prev + 10));
            if (scanProgress >= 100) clearInterval(interval);
          }, 200);
        })
        .catch(err => console.error("Camera error:", err));
    };

    const detectFaces = async () => {
      if (!videoRef.current || isModelsLoading) return;

      const results = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      setDetections(results);
      updateCanvas(results);
    };

    const updateCanvas = (results) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };
      
      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetections = faceapi.resizeResults(results, displaySize);
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw detections with custom styling
      faceapi.draw.drawDetections(canvas, resizedDetections, {
        lineWidth: 2,
        boxColor: '#00ffff',
        textColor: '#00ffff'
      });
      
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections, {
        lineWidth: 1,
        color: '#8a2be2'
      });
      
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections, 0.05, {
        fontSize: 16,
        fontStyle: 'bold'
      });
    };

    loadModels();
    const detectionInterval = setInterval(detectFaces, 100);

    return () => {
      clearInterval(detectionInterval);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isModelsLoading, scanProgress]);

  const handleCapture = () => {
    if (detections?.[0]) {
      const { age, gender, expressions } = detections[0];
      setCapturedData({
        age: Math.round(age),
        gender,
        emotion: Object.entries(expressions)
          .sort((a, b) => b[1] - a[1])[0][0],
        timestamp: new Date().toLocaleTimeString()
      });
    }
  };

  return (
    <div className="face-detection-container">
      {/* Left Panel - Camera Feed */}
      <div className="camera-panel">
        <div className="video-container">
          <video 
            ref={videoRef} 
            className="video-feed"
            autoPlay 
            muted
          />
          <canvas 
            ref={canvasRef} 
            className="detection-canvas"
          />
          
          {isModelsLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading AI Models... {scanProgress}%</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="control-buttons">
          <button className="close-button" onClick={onClose}>
            Close Scanner
          </button>
          <button 
            className={`capture-button ${!detections ? 'disabled' : ''}`}
            onClick={handleCapture}
            disabled={!detections}
          >
            Capture Analysis
          </button>
        </div>
      </div>
      
      {/* Right Panel - Results */}
      {/* <div className="results-panel">
        <h3 className="results-title">CAPTURE RESULTS</h3>
        
        {capturedData ? (
          <div className="results-container">
            <div className="result-card">
              <div className="result-label">Age</div>
              <div className="result-value">{capturedData.age}</div>
            </div>
            <div className="result-card">
              <div className="result-label">Gender</div>
              <div className="result-value">{capturedData.gender}</div>
            </div>
            <div className="result-card">
              <div className="result-label">Emotion</div>
              <div className="result-value">{capturedData.emotion}</div>
            </div>
            <div className="result-card">
              <div className="result-label">Timestamp</div>
              <div className="result-value">{capturedData.timestamp}</div>
            </div>
            
            <button 
              className="clear-button"
              onClick={() => setCapturedData(null)}
            >
              Clear Results
            </button>
          </div>
        ) : (
          <div className="empty-results">
            No capture results yet. Click "Capture" to analyze current frame.
          </div>
        )}
      </div> */}


<div className="results-panel">
  <h3 className="results-title">CAPTURE RESULTS</h3>
  
  {capturedData ? (
    <div className="results-container">
      {/* Existing Results Cards */}
      <div className="result-card">
        <div className="result-label">Age</div>
        <div className="result-value">{capturedData.age}</div>
      </div>
      <div className="result-card">
        <div className="result-label">Gender</div>
        <div className="result-value">{capturedData.gender}</div>
      </div>
      <div className="result-card">
        <div className="result-label">Emotion</div>
        <div className="result-value">{capturedData.emotion}</div>
      </div>
      <div className="result-card">
        <div className="result-label">Timestamp</div>
        <div className="result-value">{capturedData.timestamp}</div>
      </div>

      {/* Add the Song Recommendation Component */}
      <div className="song-recommendation-section">
        <h4 className="recommendation-title">AI MUSIC SUGGESTIONS</h4>
        <SongRecommendation 
          age={capturedData.age}
          gender={capturedData.gender}
          emotion={capturedData.emotion}
        />
      </div>
      
      <button 
        className="clear-button"
        onClick={() => setCapturedData(null)}
      >
        Clear Results
      </button>
    </div>
  ) : (
    <div className="empty-results">
      No capture results yet. Click "Capture" to analyze current frame.
    </div>
  )}
</div>
    </div>
  );
};

export default FaceDetection;