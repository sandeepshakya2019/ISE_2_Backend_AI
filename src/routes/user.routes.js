const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User registration
router.post("/register", userController.register);

// Login with OTP
router.post("/login-otp", userController.loginWithOTP);

// Login with Token
router.post("/login-token", userController.loginWithToken);

// Login Check
router.get("/login-check", userController.loginCheck);

// Logout
router.post("/logout", userController.logout);

// KYC Submission
router.post("/kyc", userController.submitKYC);

module.exports = router;
