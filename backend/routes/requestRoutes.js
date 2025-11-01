// backend/routes/requestRoutes.js
const express = require("express");
const router = express.Router();
const SavedWeather = require("../models/SavedWeather");

// 🟢 GET all saved weather requests
router.get("/", async (req, res) => {
  try {
    const records = await SavedWeather.find().sort({ createdAt: -1 });
    res.json({ success: true, data: records });
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ success: false, message: "Failed to fetch records" });
  }
});

// 🟡 UPDATE a saved record (edit temperature)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { temperature } = req.body;

    const updated = await SavedWeather.findByIdAndUpdate(
      id,
      { temperature },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.json({ success: true, message: "Record updated", data: updated });
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({ success: false, message: "Failed to update record" });
  }
});

// 🔴 DELETE a saved record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SavedWeather.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ success: false, message: "Failed to delete record" });
  }
});

module.exports = router;
