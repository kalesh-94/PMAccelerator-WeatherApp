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

//  Connect DB
connectDB(MONGO_URI).catch((err) => {
  console.error("MongoDB Connection Failed:", err);
  process.exit(1);
});

// Body Parsers - MUST BE FIRST
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

//  CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://weather-app-ecru-phi-57.vercel.app", // frontend deployed
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

//  Logger
app.use(morgan("dev"));

//  Test Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Weather API backend running 🚀" });
});

//  Main Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/requests", requestRoutes);

//  Save Weather Route
app.post("/api/save", async (req, res) => {
  try {
    const data = req.body;
    console.log("Incoming Data =>", data);

    // Accept multiple formats
    const locationName =
      data?.location?.name || data?.location || data?.city || null;

    const temp =
      data?.current?.main?.temp || data?.temperature || data?.temp || null;

    if (!locationName || temp === null) {
      console.log(" Invalid payload received:", data);
      return res.status(400).json({
        success: false,
        message: "Invalid weather data format",
        received: data,
      });
    }

    const saved = await SavedWeather.create({
      location: { name: locationName },
      temperature: temp,
      description:
        data?.current?.weather?.[0]?.description || data?.description || "",
      forecast:
        data?.forecast?.map((f) => ({
          date: f.date,
          min: f.min,
          max: f.max,
          summary: f.summary,
        })) || [],
    });

    res.json({
      success: true,
      message: "Weather data saved successfully!",
      record: saved,
    });
  } catch (err) {
    console.error(" Error saving data:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save weather data",
    });
  }
});

//  Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

//  Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
