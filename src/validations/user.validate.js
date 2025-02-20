export const registerValidation = (body) => {
  console.log("Register Validation", body);

  // Initialize error messages and error flag
  let errorMsg = {
    mobileNo: "",
    emailId: "",
    fullName: "",
    userError: "",
  };
  let isError = false;

  const { mobileNo, fullName, emailId } = body;

  // Validate Mobile Number
  if (!mobileNo) {
    errorMsg.mobileNo = "Mobile No is required";
    isError = true;
  } else {
    if (mobileNo.length < 10) {
      errorMsg.mobileNo = "Mobile No Should be greater than 10";
      isError = true;
    }
    if (mobileNo.length > 10) {
      errorMsg.mobileNo = "Mobile No Should be less than 10";
      isError = true;
    } else {
      if (isNaN(mobileNo)) {
        errorMsg.mobileNo = "Mobile No should be a digit";
        isError = true;
      }
    }
  }

  // Validate Full Name
  if (!fullName) {
    errorMsg.fullName = "Full Name is required";
    isError = true;
  } else {
    if (fullName.length < 4) {
      errorMsg.fullName = "Full Name Should be greater than 4 Characters";
      isError = true;
    }
  }

  // Validate Email (if provided)
  if (emailId?.length > 0) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailId)) {
      errorMsg.emailId = "Invalid Email Id";
      isError = true;
    }
  }

  return [isError, errorMsg];
};

export const KYCValidate = (body) => {
  console.log("KYC Validate", body);

  const { aadharCardId, accountNumber, ifscCode, address } = body;

  // Initialize error messages and error flag
  let errorMsg = {
    aadharCardId: "",
    accountNumber: "",
    ifscCode: "",
    address: "",
  };
  let isError = false;

  // Validate Aadhar Card Number
  if (!aadharCardId) {
    errorMsg.aadharCardId = "Aadhar Card No is required";
    isError = true;
  } else {
    if (aadharCardId.length < 12) {
      errorMsg.aadharCardId = "Aadhar Card No Should be greater than 12";
      isError = true;
    }
    if (aadharCardId.length > 12) {
      errorMsg.aadharCardId = "Aadhar Card No Should be less than 12";
      isError = true;
    } else {
      if (isNaN(aadharCardId)) {
        errorMsg.aadharCardId = "Aadhar Card No should be a digit";
        isError = true;
      }
    }
  }

  return [isError, errorMsg];
};

export const validateLoginUser = (body) => {
  // Initialize error messages and error flag
  let errorMsg = {
    mobileNo: "",
  };
  let isError = false;

  const { mobileNo } = body;

  // Validate Mobile Number
  if (!mobileNo) {
    errorMsg.mobileNo = "Mobile No is required";
    isError = true;
  } else {
    if (mobileNo.length < 10) {
      errorMsg.mobileNo = "Mobile No Should be greater than 10";
      isError = true;
    }
    if (mobileNo.length > 10) {
      errorMsg.mobileNo = "Mobile No Should be less than 10";
      isError = true;
    } else {
      if (isNaN(mobileNo)) {
        errorMsg.mobileNo = "Mobile No should be a digit";
        isError = true;
      }
    }
  }

  return [isError, errorMsg];
};

export const ValidateUserAndOTP = (body) => {
  console.log("Login Validation", body);

  // Initialize error messages and error flag
  let errorMsg = {
    mobileNo: "",
    otpError: "",
  };
  let isError = false;

  const { mobileNo, otp } = body;

  // Validate Mobile Number
  if (!mobileNo) {
    errorMsg.mobileNo = "Mobile No is required";
    isError = true;
  } else {
    if (mobileNo.length < 10) {
      errorMsg.mobileNo = "Mobile No Should be greater than 10";
      isError = true;
    }
    if (mobileNo.length > 10) {
      errorMsg.mobileNo = "Mobile No Should be less than 10";
      isError = true;
    } else {
      if (isNaN(mobileNo)) {
        errorMsg.mobileNo = "Mobile No should be a digit";
        isError = true;
      }
    }
  }

  // Validate OTP
  if (!otp) {
    errorMsg.otp = "OTP is required";
    isError = true;
  } else {
    if (otp.length !== 6) {
      errorMsg.otp = "OTP Should be 6 digits";
      isError = true;
    } else {
      if (isNaN(otp)) {
        errorMsg.otp = "OTP should be a digit";
        isError = true;
      }
    }
  }

  return [isError, errorMsg];
};
