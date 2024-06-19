import express from "express";
///////////// controller functions
import {
  loginUser,
  signupUser,
  logoutUser,
  userData,
  resetPasswordLink,
  resetPasswordPage,
  resetPassword,
  deleteUser,
} from "../controllers/userController.js";
import { logoutDeleteCookies } from "../middleware/userMiddleware.js";

const router = express.Router();

///////////// signup route
router.post("/signup", signupUser);

///////////// login route
router.post("/login", loginUser);

///////////// logout route
router.get("/logout", logoutDeleteCookies, logoutUser);

///////////// Data route
router.get("/data", userData);

///////////// Reset Link route, sending link to email
router.post("/reset-password-link", resetPasswordLink);

///////////// Reset Page route, email link directs to this page
router.get("/reset-password-page", resetPasswordPage);

///////////// Reset Password, handles the override of old pass to new
router.post("/reset-password", resetPassword);

///////////// Delete Route
router.delete("/delete", deleteUser);

// ///////////// google route
// router.get('/google', logoutUser)

// ///////////// github route
// router.get('/github', logoutUser)

export default router;
