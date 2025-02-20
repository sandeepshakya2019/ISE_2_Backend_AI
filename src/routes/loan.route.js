import { Router } from "express";
import {
  accessLoan,
  getAllLoans,
  QRCodeGenrator,
  repayLoan,
} from "../controllers/loan.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Route to get all loans for the authenticated user
router.route("/getAll").get(upload.none(), auth, getAllLoans);

// Route to request a loan for the authenticated user
router.route("/access").post(upload.none(), auth, accessLoan);

// Route to repay a loan (payment integration)
router.route("/repay").post(upload.none(), auth, repayLoan);

export default router;
