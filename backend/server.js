
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const SavedWeather = require("./models/SavedWeather");

const weatherRoutes = require("./routes/weatherRoutes");
const requestRoutes = require("./routes/requestRoutes");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// Connect to MongoDB
connectDB(MONGO_URI).catch((err) => {
  console.error(" MongoDB connection failed:", err);
  process.exit(1);
});

//  Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://weather-app-ecru-phi-57.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);


// Routes
app.get("/", (req, res) =>
  res.send({ ok: true, message: " Weather API backend running " })
);


app.use("/api/weather", weatherRoutes);
app.use("/api/requests", requestRoutes);

// Save weather data to MongoDB
app.post("/api/save", async (req, res) => {
  try {
    const data = req.body;

    if (!data?.location?.name || !data?.current?.main?.temp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid weather data" });
    }

    const saved = await SavedWeather.create({
      location: data.location,
      temperature: data.current.main.temp,
      description: data.current.weather?.[0]?.description || "",
      forecast: data.forecast?.map((f) => ({
        date: f.date,
        min: f.min,
        max: f.max,
        summary: f.summary,
      })),
    });

    res.json({
      success: true,
      message: "Weather data saved successfully!",
      record: saved,
    });
  } catch (err) {
    console.error(" Error saving weather:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to save weather data" });
  }
});

//  Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
