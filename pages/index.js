import React, { useState } from 'react';
import Calendar from '../client/components/calendar';
// import 'normalize.css';
import '../client/styles/app.sass';
import Reservations from '../client/components/reservations';
import LeftRight from '../client/components/leftRight';
import graphqlFetch from '../client/utils/graphqlFetch';
import { getAllCars, getAllReservationQuery } from '../client/queries/cars';
import PopupForAddReservation from '../client/components/popupForAddReservation';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Breadcrumb } from 'antd';
import { setReservation } from '../client/actions/calendarActions';

function Index({ cars, showPopup }) {
  return (
    <div className={`page`}>
      <div className="page__title">Calendar</div>
      <Breadcrumb
        className={`breadcrumbs`}
        style={{
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '17px',
        }}
      >
        <Breadcrumb.Item style={{ textDecorationLine: 'underline' }}>
          <a style={{ color: '#1E88E5' }} href="">
            Home
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Calendar</Breadcrumb.Item>
      </Breadcrumb>
      ,
      <div className="page-cart">
        <LeftRight
          left={<Reservations cars={cars} />}
          classNameRight={`calendar-wrapper`}
          right={<Calendar cars={cars} />}
        />
        {showPopup && <PopupForAddReservation />}
      </div>
    </div>
  );
}
Index.getInitialProps = async ({ reduxStore, ...ctx }) => {
  const { dispatch } = reduxStore;
  const { cars } = await graphqlFetch(getAllCars());
  const { reservations } = await graphqlFetch(getAllReservationQuery());
  const reservationForRedux = {};
  reservations.forEach((elem) => {
    if (!reservationForRedux[elem.carId]) {
      reservationForRedux[elem.carId] = [];
    }
    reservationForRedux[elem.carId].push({
      status: elem.status,
      customer: elem.userName,
      start: elem.dateStart,
      end: elem.dateEnd,
    });
  });
  dispatch(setReservation(reservationForRedux));
  return {
    cars,
  };
};
const mapStateToProps = ({ calendar }) => {
  return {
    showPopup: calendar.showPopup,
  };
};
export default compose(connect(mapStateToProps))(Index);
