import React from 'react';
import { Icon } from 'antd';
import reservationConfig from '../config/reservationConfig';

const Reservation = ({ reservation, days = 1 }) => {
  const width = days * 29 - 6;
  return (
    <div
      className={`reservation`}
      style={{
        background: reservationConfig.colors[reservation.status],
        width: width,
        justifyContent: width >= 175 ? 'space-between' : 'center',
      }}
    >
      {width >= 175 && (
        <div className="reservation-interval">
          <div className="reservation-city">Berlin</div>
          <div className="reservation-time">10:00</div>
        </div>
      )}

      <div className="reservation-interval reservation-interval_center">
        <div className="reservation-status">{reservation.status}</div>
        <div className="reservation-customer">
          <Icon type="user" /> {reservation.customer}
        </div>
      </div>
      {width >= 175 && (
        <div className="reservation-interval reservation-interval_left">
          <div className="reservation-city">Berlin</div>
          <div className="reservation-time">10:00</div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
