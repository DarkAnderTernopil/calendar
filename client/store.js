import { applyMiddleware, combineReducers, createStore } from 'redux';
import { calendarReducer, calendarInitialData } from './reducers/calendarReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  calendar: calendarReducer,
});
const initialData = {
  calendar: calendarInitialData,
};

export const initializeStore = (initialState = initialData) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};
