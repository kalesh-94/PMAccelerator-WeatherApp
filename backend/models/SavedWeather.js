// backend/models/SavedWeather.js
const mongoose = require("mongoose");

const SavedWeatherSchema = new mongoose.Schema(
  {
    location: {
      name: String,
      lat: Number,
      lon: Number,
    },
    temperature: Number,
    description: String,
    forecast: [
      {
        date: String,
        min: Number,
        max: Number,
        summary: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedWeather", SavedWeatherSchema);
