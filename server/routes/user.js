import express from "express";
///////////// controller functions
import {
  loginUser,
  signupUser,
  logoutUser,
  checkCookie,
  userData,
  resetPasswordLink,
  resetPasswordPage,
  resetPassword,
} from "../controllers/userController.js";
import { logoutDeleteCookies } from "../middleware/userMiddleware.js";

const router = express.Router();

///////////// signup route
router.post("/signup", signupUser);

///////////// login route
router.post("/login", loginUser);

///////////// logout route
router.get("/logout", logoutDeleteCookies, logoutUser);

///////////// logout route
router.get("/cookie", checkCookie);

///////////// Data route
router.get("/data", userData);

///////////// Reset Link route
router.post("/reset-password-link", resetPasswordLink);

///////////// Reset Page route
router.get("/reset-password-page", resetPasswordPage);

///////////// Reset Password
router.post("/reset-password", resetPassword);

// ///////////// google route
// router.get('/google', logoutUser)

// ///////////// github route
// router.get('/github', logoutUser)

export default router;