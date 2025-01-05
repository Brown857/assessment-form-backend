const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/fecesDescriptions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Schema and Model
const fecesSchema = new mongoose.Schema({
  fecesDescriptions: [
    {
      altId: { type: String },
      description: { type: String },
    },
  ],
});

const FecesDescription = mongoose.model("FecesDescription", fecesSchema);
app.post("/submit-feces-data", async (req, res) => {
  try {
    const { descriptions } = req.body; // Expects { "descriptions": { "Type 1": "desc1", "Type 2": "desc2", ... } }

    if (!descriptions || typeof descriptions !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const fecesDescriptions = Object.entries(descriptions).map(([altId, description]) => ({
      altId,
      description,
    }));

    // Save data in the database
    const fecesDocument = new FecesDescription({ fecesDescriptions });
    await fecesDocument.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
