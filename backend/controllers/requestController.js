// backend/controllers/requestController.js
const WeatherRequest = require('../models/WeatherRequest');
const { getWeatherForInput } = require('../utils/openWeather');
const { validationResult } = require('express-validator');

async function createRequest(req, res) {
  // expected body: { query, start_date?, end_date? }
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { query, start_date, end_date } = req.body;
    if (!query) return res.status(400).json({ success: false, error: 'query is required' });

    // validate date range if present
    if (start_date && end_date) {
      const s = new Date(start_date);
      const e = new Date(end_date);
      if (isNaN(s) || isNaN(e) || s > e) {
        return res.status(400).json({ success: false, error: 'Invalid date range' });
      }
    }

    // fetch weather snapshot (current + normalized forecast)
    const weather = await getWeatherForInput(query);

    const doc = new WeatherRequest({
      query,
      locationName: weather.location?.name || query,
      lat: weather.location?.lat || 0,
      lon: weather.location?.lon || 0,
      start_date: start_date ? new Date(start_date) : undefined,
      end_date: end_date ? new Date(end_date) : undefined,
      result_snapshot: weather
    });

    await doc.save();
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    console.error('createRequest error', err?.message || err);
    return res.status(500).json({ success: false, error: 'Failed to create request' });
  }
}

async function listRequests(req, res) {
  try {
    const docs = await WeatherRequest.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, data: docs });
  } catch (err) {
    console.error('listRequests error', err);
    res.status(500).json({ success: false, error: 'Failed to list requests' });
  }
}

async function getRequest(req, res) {
  try {
    const id = req.params.id;
    const doc = await WeatherRequest.findById(id);
    if (!doc) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error('getRequest error', err);
    res.status(500).json({ success: false, error: 'Failed to get request' });
  }
}

async function updateRequest(req, res) {
  try {
    const id = req.params.id;
    const allowed = ['query', 'start_date', 'end_date'];
    const update = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) update[k] = req.body[k]; });

    // if query updated, re-fetch snapshot and location fields
    if (update.query) {
      const weather = await getWeatherForInput(update.query);
      update.locationName = weather.location?.name || update.query;
      update.lat = weather.location?.lat || 0;
      update.lon = weather.location?.lon || 0;
      update.result_snapshot = weather;
    }

    if (update.start_date) update.start_date = new Date(update.start_date);
    if (update.end_date) update.end_date = new Date(update.end_date);

    const doc = await WeatherRequest.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, error: 'Not found' });

    res.json({ success: true, data: doc });
  } catch (err) {
    console.error('updateRequest error', err);
    res.status(500).json({ success: false, error: 'Failed to update request' });
  }
}

async function deleteRequest(req, res) {
  try {
    const doc = await WeatherRequest.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error('deleteRequest error', err);
    res.status(500).json({ success: false, error: 'Failed to delete request' });
  }
}

module.exports = { createRequest, listRequests, getRequest, updateRequest, deleteRequest };
