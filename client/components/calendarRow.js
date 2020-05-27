import React from 'react';
import Reservation from './reservation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

const CalendarRow = ({ car, allDays, changePopup, reservations = [] }) => {
  return (
    <div className="calendar-row" key={car._id}>
      {allDays.map((elem) => {
        let reservation = null;
        reservations.forEach((reserv) => {
          const momentStart = moment.unix(reserv.start);
          const momentEnd = moment.unix(reserv.end);
          if (elem.format('YYYY') === momentStart.format('YYYY')) {
            if (elem.format('DDD') === momentStart.format('DDD')) {
              const lastDays = momentEnd.format('DDD') - momentStart.format('DDD');
              reservation = <Reservation reservation={reserv} days={lastDays} />;
            }
          }
        });
        return (
          <div
            onClick={() =>
              changePopup(true, { nameCar: car.name, carId: car._id, start: elem.format('X') })
            }
            className={'calendar-cel'}
            key={elem.format('ddd/DD/MM/GGGG')}
          >
            {reservation}
          </div>
        );
      })}
    </div>
  );
};

export default compose(
  connect(({ calendar }, { car }) => ({ reservations: calendar.reservations[car._id] })),
)(CalendarRow);
