const Car = require('../../models/car');
const Reservation = require('../../models/reservation');

exports.getCars = async () => {
  return Car.find({});
};
exports.getReservations = async (p) => {
  return Reservation.find({});
};
exports.addReservation = async (parent, { dateStart, dateEnd, userName, status, carId }) => {
  const reservation = new Reservation({ dateStart, dateEnd, userName, status, carId });
  return reservation.save();
};
