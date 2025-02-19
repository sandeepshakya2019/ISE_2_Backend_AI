const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      match: [/^\d{10}$/, "Invalid mobile number format"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Invalid email format"],
    },
    numberOfLoans: {
      type: Number,
      required: true,
      min: [0, "Number of loans cannot be negative"],
      default: 0,
    },
    sectionedAmount: {
      type: Number,
      required: true,
      min: [0, "Sectioned amount cannot be negative"],
      default: 0,
    },
    offeredAmount: {
      type: Number,
      required: true,
      min: [0, "Offered amount cannot be negative"],
      default: 0,
    },
    isOtp: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    OTP: {
      type: String,
    },
    photo: {
      type: String, // URL or base64 string
    },
    otpExpiresAt: {
      type: Date,
    },
    isKyc: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
