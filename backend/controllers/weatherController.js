// backend/controllers/weatherController.js
const { getWeatherForInput } = require('../utils/openWeather');

async function getWeather(req, res) {
  try {
    const { query, lat, lon } = req.query;

    if (lat && lon) {
      // prefer coords if provided
      const input = `${lat},${lon}`;
      const data = await getWeatherForInput(input);
      return res.json({ success: true, data });
    }

    if (!query) {
      return res.status(400).json({ success: false, error: 'Provide query or lat & lon' });
    }

    const data = await getWeatherForInput(query);
    return res.json({ success: true, data });
  } catch (err) {
    if (err.code === 'LOCATION_NOT_FOUND') {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    console.error('getWeather error', err?.message || err);
    return res.status(500).json({ success: false, error: 'Failed to fetch weather' });
  }
}

module.exports = { getWeather };
