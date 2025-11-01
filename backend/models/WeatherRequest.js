// backend/models/WeatherRequest.js
const mongoose = require('mongoose');

const WeatherRequestSchema = new mongoose.Schema({
  query: { type: String, required: true },         // user input
  locationName: { type: String, required: true },  // canonical name from geocoding
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  start_date: { type: Date }, // optional
  end_date: { type: Date },   // optional
  result_snapshot: { type: mongoose.Schema.Types.Mixed }, // store fetched weather JSON
}, { timestamps: true });

module.exports = mongoose.model('WeatherRequest', WeatherRequestSchema);
