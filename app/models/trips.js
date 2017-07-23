var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  from: String,
  to: String,
  associate_name: String,
  uid: String,
  journey_date: Date,
  seats_available: Number,
  updated_at: { type: Date, default: Date.now },
  reserved_for:{uid: String, name: String, cancelled: Boolean }
});

module.exports = mongoose.model('Trip', TripSchema);