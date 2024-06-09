import express from "express";
///////////// controller functions
import {
  requestCode,
  verifyCode,
  verifyPage,
} from "../controllers/verifyController.js";
import { verifyPageMiddleware } from "../middleware/verificationMiddleware.js";

const router = express.Router();

///////////// request Code route
router.post("/newCode", requestCode);

///////////// verify Code route
router.post("/verifyCode", verifyCode);

///////////// verify Page Access route
// Needs middleware to check if user is auth for current page before continuing
router.get("/verifyPage", verifyPageMiddleware, verifyPage);

export default router;
