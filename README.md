# FinSphere App Backend

## Project Overview

FinSphere App Backend is a robust backend service built with **Node.js** and **Express.js** to power the FinSphere application. It provides essential features such as JWT authentication, e-KYC verification, photo uploads using **Multer** & **Cloudinary**, loan management, and user profile handling.

🔗 **Frontend Repository:** [FinSphere Frontend](https://github.com/sandeepshakya2019/ISE_2_Frontend_AI.git)

## Features

- **User Authentication**
  - OTP-based login
  - JWT token generation and verification
- **e-KYC Verification**
  - Aadhar verification
  - Live photo upload using Multer & Cloudinary
- **Loan Management**
  - Loan request and approval handling
  - Loan payback tracking
- **User Profile Management**
  - Profile creation and updates
  - KYC details storage
- **Error Handling**
  - Centralized error management using custom API responses

## Technology Stack

| Technology     | Description                     |
| -------------- | ------------------------------- |
| **Node.js**    | JavaScript runtime              |
| **Express.js** | Web framework for Node.js       |
| **MongoDB**    | NoSQL database                  |
| **Mongoose**   | MongoDB ODM                     |
| **JWT**        | Authentication token management |
| **Multer**     | Middleware for file uploads     |
| **Cloudinary** | Cloud-based image storage       |
| **dotenv**     | Environment variable management |

## API Documentation

### Authentication APIs

#### 1. **Login with OTP**

**Endpoint:** `POST /api/auth/login-otp`

**Request Body:**

```json
{
  "mobileNo": "9084043946"
}
```

**Response:**

```json
{
  "status": 200,
  "message": "OTP sent successfully"
}
```

#### 2. **Verify OTP & Get Token**

**Endpoint:** `POST /api/auth/login-token`

**Request Body:**

```json
{
  "mobileNo": "9084043946",
  "otp": "123456"
}
```

**Response:**

```json
{
  "status": 200,
  "accessToken": "your-jwt-token",
  "user": { ... }
}
```

### e-KYC API

#### 3. **Upload KYC Details**

**Endpoint:** `POST /api/user/kyc`

**Request Body:** (Multipart FormData)

```
file: livePhoto (image)
aadharCardId: "123456789012"
accountNumber: "9876543210"
ifscCode: "HDFC0001234"
address: "123, ABC Street, City"
```

**Response:**

```json
{
  "status": 201,
  "message": "KYC Saved Successfully"
}
```

### Loan APIs

#### 4. **Apply for a Loan**

**Endpoint:** `POST /api/loan/apply`

**Request Body:**

```json
{
  "amount": 5000,
  "tenure": 12
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Loan request submitted"
}
```

#### 5. **Loan Payback**

**Endpoint:** `POST /api/loan/payback`

**Request Body:**

```json
{
  "loanId": "1234567890",
  "amountPaid": 500
}
```

**Response:**

```json
{
  "status": 200,
  "message": "Payment successful"
}
```

## Database Schema

### User Model

```javascript
const userSchema = new mongoose.Schema(
  {
    mobileNo: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    emailId: { type: String, unique: true, lowercase: true },
    noOfLoan: { type: Number, default: 0 },
    isKYC: { type: Boolean, default: false },
    otp: { type: Number, default: null },
    atoken: { type: String },
  },
  { timestamps: true }
);
```

### Loan Model

```javascript
const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    tenure: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
```

### Payback Model

```javascript
const paybackSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  amountPaid: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now },
});
```

### KYC Model

```javascript
const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aadharCardId: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/finSphere
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1h
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Deployment Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/example/finsphere-backend.git
   cd finsphere-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file and add the required environment variables.
4. **Run the server:**
   ```bash
   npm start
   ```

## Authors

- [Sandeep Kumar CS24M112](https://github.com/sandeepshakya2019)
- [Abhishek Kumar CS24M120](https://github.com/imabhishekmahli)
- [Ashant Kumar CS24M113](https://www.github.com/ashantfet)
