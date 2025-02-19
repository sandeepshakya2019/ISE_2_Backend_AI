const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    aadharCard: {
      type: String,
      required: [true, "Aadhar card number is required"],
      match: [/^\d{12}$/, "Invalid Aadhar card format"],
    },
    ifscCode: {
      type: String,
      required: [true, "IFSC code is required"],
      match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      match: [/^\d{9,18}$/, "Invalid account number format"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isOffline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KYC", kycSchema);
