const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
  dateStart: {
    type: Number,
  },
  dateEnd: {
    type: Number,
  },
  locationStart: {
    type: String,
  },
  locatingEnd: {
    type: String,
  },
  nameEvent: String,
  userName: String,
  status: String,
  carId: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
  },
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);
