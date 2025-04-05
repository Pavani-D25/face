

// // src/pages/Home.jsx
// import { useState, useEffect } from "react";
// import FaceDetection from "../components/FaceDetection";

// const Home = () => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [hoverEffect, setHoverEffect] = useState({ x: 0, y: 0, opacity: 0 });
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     // Create floating particles
//     const particleCount = 30;
//     const newParticles = Array.from({ length: particleCount }, () => ({
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 3 + 1,
//       speed: Math.random() * 0.2 + 0.1,
//       opacity: Math.random() * 0.5 + 0.1,
//       delay: Math.random() * 5
//     }));
//     setParticles(newParticles);

//     // Animate particles
//     const interval = setInterval(() => {
//       setParticles(prev => prev.map(p => ({
//         ...p,
//         y: (p.y + p.speed) % 100,
//         x: (p.x + p.speed * 0.3) % 100
//       })));
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setHoverEffect({ x, y, opacity: 0.3 });
//   };

//   const handleMouseLeave = () => {
//     setHoverEffect(prev => ({ ...prev, opacity: 0 }));
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "#0a0a12",
//         color: "#e0e0ff",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: '"Orbitron", "Segoe UI", sans-serif',
//         overflow: "hidden",
//         position: "relative"
//       }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Background grid */}
//       <div style={{
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         backgroundImage: `
//           linear-gradient(to right, rgba(0, 180, 255, 0.05) 1px, transparent 1px),
//           linear-gradient(to bottom, rgba(0, 180, 255, 0.05) 1px, transparent 1px)
//         `,
//         backgroundSize: "50px 50px",
//         opacity: 0.8
//       }} />

//       {/* Floating particles */}
//       {particles.map((p, i) => (
//         <div key={i} style={{
//           position: "absolute",
//           left: `${p.x}%`,
//           top: `${p.y}%`,
//           width: `${p.size}px`,
//           height: `${p.size}px`,
//           backgroundColor: "#00ffff",
//           borderRadius: "50%",
//           opacity: p.opacity,
//           filter: "blur(1px)",
//           animation: `float ${5 + p.delay}s infinite ease-in-out`
//         }} />
//       ))}

//       {/* Hover light effect */}
//       <div style={{
//         position: "absolute",
//         left: `${hoverEffect.x}%`,
//         top: `${hoverEffect.y}%`,
//         transform: "translate(-50%, -50%)",
//         width: "300px",
//         height: "300px",
//         background: "radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
//         opacity: hoverEffect.opacity,
//         transition: "opacity 0.3s ease",
//         pointerEvents: "none"
//       }} />

//       {/* Scan lines overlay */}
//       <div style={{
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         background: "linear-gradient(to bottom, transparent 95%, rgba(0, 255, 255, 0.03) 95%)",
//         backgroundSize: "100% 5px",
//         pointerEvents: "none",
//         animation: "scanline 8s linear infinite"
//       }} />

//       {!isScanning ? (
//         <div
//           style={{
//             textAlign: "center",
//             maxWidth: "700px",
//             padding: "60px",
//             borderRadius: "16px",
//             background: "rgba(10, 15, 30, 0.4)",
//             boxShadow: "0 0 50px rgba(0, 200, 255, 0.2)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(0, 255, 255, 0.1)",
//             position: "relative",
//             overflow: "hidden",
//             zIndex: 2
//           }}
//         >
//           {/* Border animation */}
//           <div style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: "2px",
//             background: "linear-gradient(to right, transparent, #00ffff, transparent)",
//             animation: "borderTop 3s linear infinite"
//           }} />
//           <div style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: "2px",
//             background: "linear-gradient(to right, transparent, #8a2be2, transparent)",
//             animation: "borderBottom 3s linear infinite 1.5s"
//           }} />

//           <h1
//             style={{
//               fontSize: "4rem",
//               background: "linear-gradient(90deg, #00ffff, #8a2be2)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               marginBottom: "1.5rem",
//               fontWeight: "800",
//               letterSpacing: "2px",
//               textShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
//               fontFamily: "'Orbitron', sans-serif"
//             }}
//           >
//             FACE ECHO
//           </h1>
//           <p
//             style={{
//               fontSize: "1.3rem",
//               color: "rgba(200, 220, 255, 0.9)",
//               marginBottom: "3rem",
//               lineHeight: "1.6",
//               textShadow: "0 0 5px rgba(0, 200, 255, 0.5)"
//             }}
//           >
//             NEXT-GEN FACIAL RECOGNITION SYSTEM<br />
//             <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>BIOMETRIC ANALYSIS PLATFORM v4.2</span>
//           </p>
//           <button
//             onClick={() => setIsScanning(true)}
//             style={{
//               padding: "18px 50px",
//               fontSize: "1.2rem",
//               background: "linear-gradient(135deg, rgba(0, 255, 255, 0.8), rgba(138, 43, 226, 0.8))",
//               color: "white",
//               border: "none",
//               borderRadius: "30px",
//               cursor: "pointer",
//               boxShadow: "0 0 20px rgba(0, 200, 255, 0.5)",
//               transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
//               fontWeight: "bold",
//               letterSpacing: "1px",
//               position: "relative",
//               overflow: "hidden",
//               zIndex: 1,
//               ":hover": {
//                 transform: "translateY(-5px) scale(1.05)",
//                 boxShadow: "0 0 30px rgba(138, 43, 226, 0.8)",
//               }
//             }}
//           >
//             <span style={{ position: "relative", zIndex: 2 }}>INITIATE SCAN</span>
//             <span style={{
//               position: "absolute",
//               top: "-50%",
//               left: "-50%",
//               width: "200%",
//               height: "200%",
//               background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
//               transform: "rotate(45deg) translate(-20%, 100%)",
//               transition: "all 0.6s",
//               ":hover": {
//                 transform: "rotate(45deg) translate(20%, -100%)"
//               }
//             }} />
//           </button>

//           <div style={{
//             marginTop: "3rem",
//             fontSize: "0.8rem",
//             color: "rgba(150, 180, 255, 0.6)",
//             display: "flex",
//             justifyContent: "center",
//             gap: "2rem"
//           }}>
//             <span>NEURAL NETWORK READY</span>
//             <span style={{ color: "#00ffaa" }}>•</span>
//             <span>3D MAPPING ONLINE</span>
//             <span style={{ color: "#00ffaa" }}>•</span>
//             <span>AI PROCESSORS ACTIVE</span>
//           </div>
//         </div>
//       ) : (
//         <FaceDetection onClose={() => setIsScanning(false)} />
//       )}

//       {/* Global styles */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;800&display=swap');
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
        
//         @keyframes scanline {
//           0% { background-position: 0 0; }
//           100% { background-position: 0 100%; }
//         }
        
//         @keyframes borderTop {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         @keyframes borderBottom {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;

















import { useState, useEffect, useRef } from "react";
import FaceDetection from "../components/FaceDetection";

const Home = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [particles, setParticles] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [voiceActive, setVoiceActive] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const buttonOrbit = useRef([]);
  const textParticles = useRef([]);

  // System boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      // Phase 1: Initialize core particles
      await new Promise(resolve => {
        const coreParticles = Array.from({ length: 500 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.max(0.5, Math.random() * 4 + 1),
          phase: Math.random() * Math.PI * 2,
          color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`,
          state: 'chaos'
        }));
        setParticles(coreParticles);
        setTimeout(resolve, 800);
      });

      // Phase 2: Energy surge
      for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(() => {
          setEnergyLevel(i);
          resolve();
        }, 20));
      }

      // Phase 3: Form UI structure
      formTextStructure();
      initButtonOrbit();
    };

    bootSequence();
  }, []);

  // Initialize button orbit particles
  const initButtonOrbit = () => {
    buttonOrbit.current = Array.from({ length: 48 }, (_, i) => ({
      id: `orb-${i}`,
      angle: (i / 48) * Math.PI * 2,
      radius: 0,
      speed: Math.max(0.01, Math.random() * 0.02 + 0.01),
      distance: 80 + Math.random() * 40,
      size: Math.max(1, 1.5 + Math.random() * 2)
    }));
  };

  // Form text structure from particles
  const formTextStructure = () => {
    const titleLayout = generateTextCoordinates("FACE ECHO", 40, 30, 4);
    const subtitleLayout = generateTextCoordinates("QUANTUM BIOMETRICS", 40, 60, 2);
    
    textParticles.current = [...titleLayout, ...subtitleLayout];
    
    setParticles(prev => 
      prev.map((p, i) => ({
        ...p,
        target: textParticles.current[i % textParticles.current.length] || null,
        state: 'forming'
      }))
    );
  };

  // Generate text coordinates for particle formation
  const generateTextCoordinates = (text, x, y, spacing) => {
    const coords = [];
    let currentX = x;
    
    for (const char of text) {
      if (char === ' ') {
        currentX += spacing * 2;
        continue;
      }
      
      // Simple character representation
      for (let i = 0; i < 5; i++) {
        coords.push({ 
          x: Math.max(0, Math.min(100, currentX)), 
          y: Math.max(0, Math.min(100, y + i * spacing)) 
        });
        coords.push({ 
          x: Math.max(0, Math.min(100, currentX + spacing)), 
          y: Math.max(0, Math.min(100, y + i * spacing)) 
        });
      }
      
      currentX += spacing * 2;
    }
    
    return coords;
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw energy field with safe opacity
      const energyOpacity = Math.max(0, Math.min(1, energyLevel / 500));
      ctx.fillStyle = `rgba(0, 200, 255, ${energyOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw main particles with protection
      particles.forEach(p => {
        const safeSize = Math.max(0.1, p.size);
        const x = (Math.max(0, Math.min(100, p.x))) / 100 * canvas.width;
        const y = (Math.max(0, Math.min(100, p.y))) / 100 * canvas.height;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, safeSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        if (p.state === 'formed') {
          particles.forEach(other => {
            if (other.id <= p.id) return;
            const otherX = (Math.max(0, Math.min(100, other.x))) / 100 * canvas.width;
            const otherY = (Math.max(0, Math.min(100, other.y))) / 100 * canvas.height;
            const distance = Math.sqrt(Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2));
            if (distance < 8) {
              ctx.strokeStyle = `rgba(0, 255, 255, ${Math.max(0, 1 - distance/8)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(otherX, otherY);
              ctx.stroke();
            }
          });
        }
      });

      // Draw button orbit with protection
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 180;
      buttonOrbit.current.forEach(p => {
        p.angle += Math.max(0.001, p.speed);
        const x = centerX + Math.cos(p.angle) * Math.max(0, p.distance);
        const y = centerY + Math.sin(p.angle) * Math.max(0, p.distance * 0.6);
        const pulse = Math.max(-2.9, Math.min(3, Math.sin(Date.now() * 0.002 + p.id.charCodeAt(0)) * 3));
        const radius = Math.max(0.1, p.size + pulse);
        
        ctx.fillStyle = `hsla(${180 + pulse * 10}, 100%, 60%, 0.8)`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (pulse > 1.5) {
          ctx.strokeStyle = `rgba(0, 255, 255, ${Math.max(0, pulse / 3)})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(centerX, centerY);
          ctx.stroke();
        }
      });

      // Draw energy waves
      const waveOpacity = 0.2 + Math.sin(Date.now() * 0.001) * 0.1;
      ctx.strokeStyle = `rgba(0, 255, 255, ${Math.max(0, Math.min(1, waveOpacity))})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const radius = Math.max(0, 150 + i * 60 + Math.sin(Date.now() * 0.001 + i) * 10);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particles, energyLevel]);

  // Particle physics engine
  useEffect(() => {
    const physicsInterval = setInterval(() => {
      setParticles(prev => prev.map(p => {
        switch(p.state) {
          case 'chaos':
            return {
              ...p,
              x: (p.x + p.vx + 100) % 100,
              y: (p.y + p.vy + 100) % 100,
              vx: p.vx * 0.99 + (Math.random() - 0.5) * 0.1,
              vy: p.vy * 0.99 + (Math.random() - 0.5) * 0.1,
              phase: p.phase + 0.03,
              size: Math.max(0.5, p.size)
            };
          
          case 'forming':
            if (!p.target) return { ...p, state: 'chaos' };
            const dx = p.target.x - p.x;
            const dy = p.target.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.5) {
              return { ...p, state: 'formed', size: Math.max(1, p.size) };
            }
            
            return {
              ...p,
              x: p.x + dx * 0.05,
              y: p.y + dy * 0.05,
              size: Math.max(0.5, 2 + Math.abs(Math.sin(p.phase)) * 2),
              phase: p.phase + 0.1
            };
          
          case 'formed':
            return {
              ...p,
              size: Math.max(0.5, 1.5 + Math.abs(Math.sin(p.phase)) * 0.5),
              phase: p.phase + 0.02
            };
          
          default:
            return { ...p, size: Math.max(0.5, p.size) };
        }
      }));
    }, 16);

    return () => clearInterval(physicsInterval);
  }, []);

  // Voice activation effect
  const activateVoice = () => {
    setVoiceActive(true);
    setTimeout(() => setVoiceActive(false), 2000);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#0ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Orbitron", monospace',
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Quantum Energy Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />

      {/* Voice Activation Wave */}
      {voiceActive && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "0%",
          height: "0%",
          borderRadius: "50%",
          border: "2px solid rgba(0, 255, 255, 0.5)",
          animation: "voicePulse 2s forwards",
          pointerEvents: "none"
        }} />
      )}

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-positive-interface-beep-158.mp3"
      />

      {!isScanning ? (
        <div
          style={{
            textAlign: "center",
            zIndex: 2,
            opacity: energyLevel > 50 ? 1 : 0,
            transition: "opacity 0.5s ease-out",
            transform: `translateY(${energyLevel > 50 ? 0 : 20}px)`,
            filter: `blur(${energyLevel > 50 ? 0 : 2}px)`
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: "700",
              letterSpacing: "0.5rem",
              marginBottom: "1.5rem",
              textShadow: "0 0 15px #0ff, 0 0 30px rgba(0, 255, 255, 0.5)",
              background: "linear-gradient(90deg, #0ff, #0af)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            FACE ECHO
          </h1>
          
          <div
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
              letterSpacing: "0.3rem",
              marginBottom: "3rem",
              color: "rgba(0, 255, 255, 0.7)",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
            }}
          >
            QUANTUM BIOMETRIC MATRIX v4.2.1
          </div>

          <button
            onClick={() => {
              setIsScanning(true);
              activateVoice();
              if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
              }
            }}
            style={{
              padding: "clamp(12px, 2vw, 18px) clamp(30px, 5vw, 50px)",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              background: "transparent",
              color: "#0ff",
              border: "1px solid #0ff",
              borderRadius: "0",
              cursor: "pointer",
              letterSpacing: "0.2rem",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
              ":hover": {
                background: "rgba(0, 255, 255, 0.1)",
                boxShadow: "0 0 40px rgba(0, 255, 255, 0.6)",
                transform: "translateY(-3px)"
              }
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              ACTIVATE QUANTUM SCAN
            </span>
            <span style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)",
              transition: "all 0.6s"
            }} />
          </button>

          {/* System Status */}
          <div style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            fontSize: "0.7rem",
            letterSpacing: "0.1rem"
          }}>
            {[
              { label: "NEURAL NET", status: "ONLINE" },
              { label: "QUANTUM CORE", status: `${energyLevel}%` },
              { label: "BIO SCANNER", status: "STANDBY" }
            ].map((item, i) => (
              <div key={i} style={{
                padding: "0.5rem 1rem",
                border: "1px solid rgba(0, 255, 255, 0.3)",
                position: "relative"
              }}>
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background: "#0ff",
                  boxShadow: "0 0 5px #0ff",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  animation: `statusPulse ${3 + i}s infinite linear`
                }} />
                <div>{item.label}</div>
                <div style={{
                  color: "#0ff",
                  fontWeight: "bold",
                  textShadow: "0 0 5px #0ff"
                }}>{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <FaceDetection onClose={() => setIsScanning(false)} />
      )}

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
        
        @keyframes voicePulse {
          0% { 
            width: 0%; 
            height: 0%; 
            opacity: 1;
          }
          100% { 
            width: 150%; 
            height: 150%; 
            opacity: 0;
          }
        }
        
        @keyframes statusPulse {
          0%, 100% { transform: scaleX(0); }
          10%, 90% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default Home;