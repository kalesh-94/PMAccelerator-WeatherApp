
const axios = require('axios');

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;
if (!OPENWEATHER_KEY) {
  console.warn('OPENWEATHER_API_KEY not set. Set it in .env');
}

const OW_BASE = 'https://api.openweathermap.org';


function parseLatLon(input) {
  const m = input.trim().match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/);
  if (!m) return null;
  return { lat: parseFloat(m[1]), lon: parseFloat(m[3]) };
}


function looksLikeZip(input) {
  return /^\d{3,10}$/.test(input.trim());
}


async function geocode(query) {
  if (!OPENWEATHER_KEY) throw new Error('OpenWeather key missing');
  const url = `${OW_BASE}/geo/1.0/direct`;
  const res = await axios.get(url, {
    params: { q: query, limit: 5, appid: OPENWEATHER_KEY }
  });
  return res.data; // array of matches 
}


async function geocodeZip(zip) {
  if (!OPENWEATHER_KEY) throw new Error('OpenWeather key missing');
  // Try with and without country code; prefer calling weather by zip later if needed.
  try {
    const url = `${OW_BASE}/geo/1.0/zip`;
    const res = await axios.get(url, { params: { zip, appid: OPENWEATHER_KEY } });
    return [res.data]; 
  } catch (err) {
    return []; // fallback empty
  }
}

async function fetchCurrentByCoords(lat, lon) {
  const url = `${OW_BASE}/data/2.5/weather`;
  const res = await axios.get(url, {
    params: { lat, lon, units: 'metric', appid: OPENWEATHER_KEY }
  });
  return res.data;
}

async function fetchForecastByCoords(lat, lon) {
  // 5 day / 3 hour forecast
  const url = `${OW_BASE}/data/2.5/forecast`;
  const res = await axios.get(url, {
    params: { lat, lon, units: 'metric', appid: OPENWEATHER_KEY }
  });
  return res.data;
}


function normalizeForecast(forecastData) {
  if (!forecastData || !forecastData.list) return [];
  const byDay = {};
  for (const item of forecastData.list) {
    // item.dt_txt like "2025-11-01 12:00:00"
    const date = item.dt_txt.split(' ')[0];
    if (!byDay[date]) byDay[date] = { temps: [], icons: {}, summaries: {} };
    byDay[date].temps.push(item.main.temp);
    const icon = item.weather?.[0]?.icon;
    const desc = item.weather?.[0]?.description || '';
    if (icon) byDay[date].icons[icon] = (byDay[date].icons[icon] || 0) + 1;
    if (desc) byDay[date].summaries[desc] = (byDay[date].summaries[desc] || 0) + 1;
  }

  
  const dates = Object.keys(byDay).sort();
  const results = dates.slice(0, 5).map(date => {
    const entry = byDay[date];
    const min = Math.min(...entry.temps);
    const max = Math.max(...entry.temps);
    // choose most frequent icon & summary
    const icon = Object.entries(entry.icons).sort((a,b)=>b[1]-a[1])[0]?.[0] || null;
    const summary = Object.entries(entry.summaries).sort((a,b)=>b[1]-a[1])[0]?.[0] || '';
    return { date, min, max, icon, summary };
  });
  return results;
}


async function getWeatherForInput(input) {
  // input may be: "lat,lon" OR numeric zip OR place name
  const latlon = parseLatLon(input);
  if (latlon) {
    const { lat, lon } = latlon;
    const current = await fetchCurrentByCoords(lat, lon);
    const forecast = await fetchForecastByCoords(lat, lon);
    return {
      location: {
        name: `${current.name || ''}${current.sys && current.sys.country ? ', ' + current.sys.country : ''}`,
        lat, lon
      },
      current,
      forecast: normalizeForecast(forecast)
    };
  }

  const trimmed = input.trim();
  if (looksLikeZip(trimmed)) {
    // try geocode zip
    const g = await geocodeZip(trimmed);
    if (g.length > 0) {
      const { lat, lon, name } = g[0];
      const current = await fetchCurrentByCoords(lat, lon);
      const forecast = await fetchForecastByCoords(lat, lon);
      return {
        location: { name: name || trimmed, lat, lon },
        current,
        forecast: normalizeForecast(forecast)
      };
    }
    
    try {
      const url = `${OW_BASE}/data/2.5/weather`;
      const res = await axios.get(url, { params: { zip: trimmed, units: 'metric', appid: OPENWEATHER_KEY } });
      const current = res.data;
      const forecast = await fetchForecastByCoords(current.coord.lat, current.coord.lon);
      return {
        location: { name: `${current.name || trimmed}`, lat: current.coord.lat, lon: current.coord.lon },
        current,
        forecast: normalizeForecast(forecast)
      };
    } catch (err) {
      
    }
  }

  
  const candidates = await geocode(trimmed);
  if (!candidates || candidates.length === 0) {
    const err = new Error('Location not found');
    err.code = 'LOCATION_NOT_FOUND';
    throw err;
  }
  
  const cand = candidates[0];
  const lat = cand.lat;
  const lon = cand.lon;
  const name = [cand.name, cand.state, cand.country].filter(Boolean).join(', ');
  const current = await fetchCurrentByCoords(lat, lon);
  const forecast = await fetchForecastByCoords(lat, lon);
  return {
    location: { name, lat, lon },
    current,
    forecast: normalizeForecast(forecast),
    candidates 
  };
}

module.exports = { getWeatherForInput, parseLatLon, geocode };
