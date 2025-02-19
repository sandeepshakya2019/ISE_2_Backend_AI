const mongoose = require("mongoose");

const paybackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: [true, "Loan ID is required"],
    },
    paybackAmount: {
      type: Number,
      required: [true, "Payback amount is required"],
      min: [0, "Payback amount cannot be negative"],
    },
    paymentType: {
      type: String,
      enum: ["UPI", "Bank Transfer", "Cash"],
      required: [true, "Payment type is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payback", paybackSchema);
