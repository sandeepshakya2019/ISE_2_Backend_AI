import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Loan } from "../models/loan.models.js";
import { User } from "../models/user.models.js";
import { Payback } from "../models/payback.models.js";
import { Kyc } from "../models/kyc.models.js";

// Controller function to fetch all details related to a user
const getAllDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id; // Extracting user ID from request object

    // Fetch user details from User model
    const userdetails = await User.findById(id);

    // Fetch loan details associated with the user
    const loandetails = await Loan.find({ userid: id });

    // Fetch payback details associated with the user
    const paybackdetails = await Payback.find({ userid: id });

    // Fetch KYC details associated with the user
    const kycDetaiils = await Kyc.find({ userid: id });

    // Combining all fetched details into a single result object
    const result = { userdetails, loandetails, paybackdetails, kycDetaiils };

    // Sending a successful response with all details
    res
      .status(200)
      .json(new ApiResponse(200, result, "[+] Details Fetched Successfully"));
  } catch (error) {
    // Handling errors and sending a server error response
    const errorMsg = {};
    errorMsg.serverError = "[-] Error in Fetching Details";
    throw new ApiError(500, errorMsg); // Server Error 500
  }
});

export { getAllDetails };
