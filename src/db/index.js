import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `[+] Connected to MongoDB (Host): ${databaseInstance.connection.host}`
    );
  } catch (err) {
    console.error("[-] MongoDB Connection Error:", err.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
