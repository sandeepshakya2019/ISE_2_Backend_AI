import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    mobileNo: {
      type: String,
      unique: true, // Ensures each mobile number is unique
      required: [true, "Mobile No is required"],
      validate: {
        // Validate that the mobile number is exactly 10 digits
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number !!`,
      },
      index: true, // Improves query performance for mobile numbers
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    emailId: {
      type: String,
      unique: true, // Ensures each email is unique
      lowercase: true, // Converts email to lowercase before saving
      required: false, // Email is optional
      validate: {
        // Validate email format
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email id !!`,
      },
    },
    noOfLoan: {
      type: Number,
      default: 0, // Default value for number of loans
    },
    sectionedAmount: {
      type: Number,
      default: 0, // Default sectioned loan amount
    },
    offeredAmount: {
      type: Number,
      default: 10000, // Default offered loan amount
    },
    isOtp: {
      type: Boolean,
      default: false, // Indicates if OTP verification is done
    },
    atoken: {
      type: String,
      required: false, // Access token for authentication
    },
    otp: {
      type: Number,
      default: null, // Stores the OTP code for verification
    },
    photo: {
      type: String,
      trim: true, // Removes unnecessary white spaces
      required: [false, "Photo is required"],
    },
    otpExpiresAt: {
      type: Date,
      default: null, // Expiry time for OTP
    },
    isKYC: {
      type: Boolean,
      default: false, // Indicates if KYC is completed
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Plugin to add pagination support for aggregate queries
userSchema.plugin(mongooseAggregatePaginate);

// Adding a custom method to generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id, // User ID
      mobileNo: this.mobileNo, // Mobile number
      fullName: this.fullName, // Full name
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key from environment variables
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Token expiration time
    }
  );
};

// Export the User model
export const User = mongoose.model("User", userSchema);
