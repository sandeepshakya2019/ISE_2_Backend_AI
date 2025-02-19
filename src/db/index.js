const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URL;
    const dbName = process.env.DB_NAME;

    if (!dbURI || !dbName) {
      throw new Error("DATABASE_URL or DB_NAME is missing in .env file");
    }

    await mongoose.connect(dbURI, {
      dbName: dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
