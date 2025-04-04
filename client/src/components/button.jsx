import React from 'react';
import './button.css'; // External CSS file

const Button = ({ label, onClick }) => {
  return (
    <button className="neumorphism-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
