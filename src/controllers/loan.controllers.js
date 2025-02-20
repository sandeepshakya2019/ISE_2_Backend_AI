import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Loan } from "../models/loan.models.js";
import { User } from "../models/user.models.js";
import stripe from "stripe";
import { totalLoans } from "../constants.js";

const strip = stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

// Function to get all loans for the logged-in user
const getAllLoans = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id; // Get user ID from request
    if (!id) {
      throw new ApiError(400, { userError: "Invalid User Request" });
    }

    // Fetch loans from the database for the given user ID
    const loans = await Loan.find({ userid: id }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new ApiResponse(200, loans, "[+] Loan Fetched Successfully"));
  } catch (error) {
    throw new ApiError(400, { userError: "Something Went Wrong in Get Loans" });
  }
});

// Function to request a loan
const accessLoan = asyncHandler(async (req, res) => {
  const { totalLoanAmount, loanReason } = req.body;
  const id = req?.user?._id;

  // Find the user in the database
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(400, { userError: "User Not Found" });
  }

  // Check if the requested loan amount is within the offered amount
  if (totalLoanAmount <= user.offeredAmount) {
    user.noOfLoan = user.noOfLoan + 1;

    // Check if the user has not exceeded the loan limit
    if (user.noOfLoan <= totalLoans) {
      user.offeredAmount -= Number(totalLoanAmount);
      user.sectionedAmount += Number(totalLoanAmount);

      // Save loan details in the database
      const loan = new Loan({
        totalLoanAmount,
        loanReason,
        loanStatus: "Requested",
        userid: user._id,
        paybackAmount: totalLoanAmount,
      });

      await loan.save();
      await user.save();

      return res
        .status(200)
        .json(new ApiResponse(200, loan, "[+] Loan Access Granted"));
    } else {
      throw new ApiError(400, { userError: "Loan Limit Exceeded" });
    }
  } else {
    throw new ApiError(400, { userError: "Insufficient Loan Amount" });
  }
});

// Function to repay a loan
const repayLoan = asyncHandler(async (req, res) => {
  const user = req.user; // Get user details from request
  const { loanId } = req.body;

  try {
    // Find and update the loan status to "Repaid"
    const loan = await Loan.findByIdAndUpdate(
      loanId,
      { paybackAmount: 0, loanStatus: "Repaid" },
      { new: true }
    );

    if (!loan) {
      throw new ApiError(404, { userError: "Loan Not Found" });
    }

    // Update user loan details
    user.sectionedAmount -= Number(loan.totalLoanAmount);
    user.offeredAmount += Number(loan.totalLoanAmount);
    user.noOfLoan = user.noOfLoan - 1;

    await user.save();
    await loan.save();

    return res
      .status(200)
      .json(new ApiResponse(200, loan, "[+] Loan Repaid Successfully"));

    // send the UPI payment link to the user
    // return res.json({ paymentLink: paymentUrl });
  } catch (error) {
    console.error("Error repaying loan:", error);
    throw new ApiError(404, { userError: "Something Went Wrong" });
  }
});

export { getAllLoans, accessLoan, repayLoan };
