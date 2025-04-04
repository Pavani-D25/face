// import React, { useState, useEffect } from 'react';
// import Spline from '@splinetool/react-spline';
// import NeumorphismButton from '../components/button'; // Import your button component
// import Modal from '../components/Modal'; // Import the Modal component
// import AuthForm from '../components/authentication'; // Import your AuthForm component

// const SplineLandingPage = () => {
//   const [error, setError] = useState(false);
//   const [showButton, setShowButton] = useState(false); // State to control button visibility
//   const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

//   const handleButtonClick = () => {
//     setModalOpen(true); // Open the modal when button is clicked
//   };

//   // Show the button after 4 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowButton(true);
//     }, 3000); // 4000 milliseconds = 4 seconds

//     return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
//   }, []);

//   return (
//     <div style={containerStyle}>
//       {error ? (
//         <div>Error loading Spline scene. Please try again later.</div>
//       ) : (
//         <>
//           {/* <Spline
//             scene="https://prod.spline.design/3PEz9sGaJpy-GkLG/scene.splinecode"
//             onError={() => setError(true)}
//           /> */}
//           {/* Neumorphism Button */}
//           {showButton && (
//             <div style={buttonContainerStyle}>
//               <NeumorphismButton 
//                 label="START" 
//                 onClick={handleButtonClick} 
//                 style={buttonStyle} // Apply the button styling here
//               />
//             </div>
//           )}
//           {/* Modal Component */}
//           <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//             <AuthForm /> {/* Your authentication form */}
//           </Modal>
//         </>
//       )}
//     </div>
//   );
// };

// const containerStyle = {
//   width: '100vw',
//   height: '100vh',
//   overflow: 'hidden', // Ensures no unwanted scrollbars
//   position: 'relative', // Needed for absolute positioning of the button
// };

// const buttonContainerStyle = {
//   position: 'absolute',
//   left: '49.9%',
//   top: '50%', // Adjust the position as needed
//   transform: 'translate(-50%, -50%)', // Centers the button
//   zIndex: 2, // Make sure the button appears on top of the Spline scene
// };

// const buttonStyle = {
//   padding: '2em 2em', // Padding as requested
//   fontSize: '1.5rem', // Font size
//   fontWeight: '700', // Bold font weight
//   fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`, // Font family
// };

// export default SplineLandingPage;




import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Add this
import Spline from '@splinetool/react-spline';
import NeumorphismButton from '../components/button';

const SplineLandingPage = () => {
  const [error, setError] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); // 👈 Initialize navigation

  const handleButtonClick = () => {
    navigate('/home'); // 👈 Directly navigate to home
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={containerStyle}>
      {error ? (
        <div>Error loading Spline scene. Please try again later.</div>
      ) : (
        <>
          <Spline
            scene="https://prod.spline.design/3PEz9sGaJpy-GkLG/scene.splinecode"
            onError={() => setError(true)}
          />
          {showButton && (
            <div style={buttonContainerStyle}>
              <NeumorphismButton 
                label="START" 
                onClick={handleButtonClick} 
                style={buttonStyle}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Styles (keep the same)
const containerStyle = {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
};

const buttonContainerStyle = {
  position: 'absolute',
  left: '49.9%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
};

const buttonStyle = {
  padding: '2em 2em',
  fontSize: '1.5rem',
  fontWeight: '700',
  fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
};

export default SplineLandingPage;