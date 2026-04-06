import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', icon }) => {
  const baseClass = variant === 'primary' ? 'button-primary' : 'button-secondary';
  return (
    <button type={type} className={`${baseClass} ${className}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
