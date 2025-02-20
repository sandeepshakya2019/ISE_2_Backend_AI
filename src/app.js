import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors());

// Parse incoming JSON requests with a size limit of 256kb
app.use(
  express.json({
    limit: "256kb",
  })
);

// Parse URL-encoded requests with extended mode and a size limit of 256kb
app.use(express.urlencoded({ extended: true, limit: "256kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Enable cookie parsing middleware
app.use(cookieParser());

// Import route handlers
import userRouter from "./routes/user.route.js";
import validateRouter from "./routes/validate.route.js";
import loanRoute from "./routes/loan.route.js";
import profileRoute from "./routes/profile.route.js";

// Define API routes
app.use("/api/v1/users", userRouter); // User-related routes
app.use("/api/v1/validate", validateRouter); // Validation-related routes
app.use("/api/v1/loan", loanRoute); // Loan-related routes
app.use("/api/v1/profile", profileRoute); // Profile-related routes

// Uncomment the following line if finance-related routes need to be added
// app.use("/api/v1/finance", validateRouter);

export { app };
