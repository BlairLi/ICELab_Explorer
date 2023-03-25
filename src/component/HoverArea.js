import React from 'react';
import '../css/Map.css';

const HoverArea = ({ text, left, top}) => {
  const areaStyle = {
    left: left,
    top: top,
  };

  return (
    <div className="hover-area" style={areaStyle}>
      <div className="hover-text">{text}</div>
    </div>
  );
};

export default HoverArea;