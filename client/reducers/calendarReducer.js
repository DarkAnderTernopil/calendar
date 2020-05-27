const calendarInitialData = {
  cars: [],
  reservations: {},
  errorMessage: null,
  showPopup: false,
  checkDay: {},
  currentShowMonth: null,
};
const addReservation = (carId, newReservation, state) => {
  try {
    const customError = new Error('TimeBad');
    const check = (item, elem) => {
      if (item >= elem.start && item <= elem.end) {
        throw customError;
      }
    };
    let carArray = [];
    if (state.reservations[carId]) {
      state.reservations[carId].forEach((elem) => {
        check(newReservation.start, elem);
        check(newReservation.end, elem);
      });
      carArray = [...state.reservations[carId], newReservation];
    } else {
      carArray.push(newReservation);
    }

    return {
      ...state,
      showPopup: false,
      reservations: {
        ...state.reservations,
        [carId]: carArray,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      ...state,
      errorMessage: 'bad time',
    };
  }
};
const calendarReducer = (state = calendarInitialData, action) => {
  switch (action.type) {
    case 'CREATE_RESERVATION': {
      return addReservation(action.carId, action.payload, state);
    }
    case 'CHANGE_POPUP_FOR_ADD': {
      return {
        ...state,
        showPopup: action.payload,
        checkDay: { ...action.checkDay },
      };
    }
    case 'SET_RESERVATION': {
      return {
        ...state,
        reservations: action.payload,
      };
    }
    case 'SET_CURRENT_SHOW_MONTH': {
      let currentShowMonth = action.payload > 12 ? 1 : action.payload;
      currentShowMonth = action.payload < 1 ? 12 : action.payload;
      return {
        ...state,
        currentShowMonth,
      };
    }

    default: {
      return state;
    }
  }
};
export { calendarReducer, calendarInitialData };
