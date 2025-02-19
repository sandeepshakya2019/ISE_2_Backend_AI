const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to Database
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    // Sample route
    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit on failure
  }
};

startServer();
