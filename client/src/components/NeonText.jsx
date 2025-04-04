import React from 'react';

const NeonText = ({ text, size = 'md' }) => {
  const sizes = {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.5rem'
  };

  return (
    <span style={{
      fontSize: sizes[size] || sizes.md,
      color: '#fff',
      textShadow: `
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #00ffff,
        0 0 30px #00ffff,
        0 0 40px #8a2be2,
        0 0 55px #8a2be2,
        0 0 75px #8a2be2
      `,
      fontWeight: 'bold',
      letterSpacing: '1px'
    }}>
      {text}
    </span>
  );
};

export default NeonText;