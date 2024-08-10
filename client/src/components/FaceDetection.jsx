





// src/components/FaceDetection.jsx

import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './FaceDetection.css'; // Assuming you save the CSS in this file

const FaceDetection = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = `${import.meta.env.BASE_URL}models`;

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
      ]);

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => console.error(error));
    };

    const onPlay = () => {
      const video = videoRef.current;
      const canvas = faceapi.createCanvasFromMedia(video);
      canvasRef.current = canvas;
      
      const container = video.parentElement;
      container.appendChild(canvas);

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        resizedDetections.forEach(detection => {
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: `${Math.round(detection.age)} year old ${detection.gender}`,
          });
          drawBox.draw(canvas);
        });

        console.log(detections);
      }, 100);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', onPlay);
    }

    loadModels();

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', onPlay);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px' }}>
      <video ref={videoRef} id="video" width="640" height="480" autoPlay muted style={{ position: 'absolute', top: 0, left: 0 }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
};

export default FaceDetection;
