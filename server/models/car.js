const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: String,
  icon: String,
  description: String,
});

module.exports = mongoose.model('Car', carSchema);
