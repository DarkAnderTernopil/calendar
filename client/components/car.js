import React from 'react';

function Car({ name, icon, description }) {
  return (
    <div className={`car`}>
      <div className="car-icon">
        <img className={`car-icon-img`} src={icon} alt="" />
      </div>
      <div className="car-right">
        <div className="car-name">{name}</div>
        <div className="car-description">{description}</div>
      </div>
    </div>
  );
}

export default Car;
