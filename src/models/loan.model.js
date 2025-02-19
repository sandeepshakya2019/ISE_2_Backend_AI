const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    totalLoanAmount: {
      type: Number,
      required: [true, "Total loan amount is required"],
      min: [0, "Total loan amount cannot be negative"],
    },
    loanReason: {
      type: String,
      required: [true, "Loan reason is required"],
      trim: true,
    },
    loanStatus: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      required: [true, "Loan status is required"],
    },
    leftAmount: {
      type: Number,
      required: [true, "Left amount is required"],
      min: [0, "Left amount cannot be negative"],
    },
    paybackAmount: {
      type: Number,
      required: [true, "Payback amount is required"],
      min: [0, "Payback amount cannot be negative"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
