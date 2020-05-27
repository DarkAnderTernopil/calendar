import React from 'react';
import Car from './car';

function Reservations({ cars = [] }) {
  return (
    <div className={`reservations`}>
      {cars.map((elem) => (
        <Car key={elem._id} name={elem.name} icon={elem.icon} description={elem.description} />
      ))}
    </div>
  );
}

export default Reservations;
