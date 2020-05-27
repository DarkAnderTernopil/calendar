import graphqlFetch from '../utils/graphqlFetch';
import { addReservationQuery } from '../queries/cars';
const setReservation = (reservations) => {
  return {
    type: 'SET_RESERVATION',
    payload: reservations,
  };
};
const addReservation = (data, carId) => {
  graphqlFetch(addReservationQuery(data), true);
  return {
    type: 'CREATE_RESERVATION',
    payload: data,
    carId,
  };
};

const changePopup = (boolean, checkDay) => {
  return {
    type: 'CHANGE_POPUP_FOR_ADD',
    payload: boolean,
    checkDay: checkDay,
  };
};

const setCurrentShowMonth = (month) => {
  return {
    type: 'SET_CURRENT_SHOW_MONTH',
    payload: month,
  };
};
export { addReservation, changePopup, setReservation, setCurrentShowMonth };
