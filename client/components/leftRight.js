import React from 'react';

const LeftRight = ({ left, right, classNameRight }) => {
  return (
    <div className={`left-right`}>
      <div className="left-right-left">{left}</div>
      <div className={`left-right-right ${classNameRight}`}>{right}</div>
    </div>
  );
};

export default LeftRight;
