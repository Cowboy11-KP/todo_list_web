import React from 'react';

const GlassPanel = ({ children, className = '', large = false }) => {
  const panelClass = large ? 'glass-panel-large' : 'glass-panel';
  return (
    <div className={`glass ${panelClass} animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

export default GlassPanel;
