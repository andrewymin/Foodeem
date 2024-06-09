import express from "express";
import {
  verifyUserToken,
  verifyGoogleLink,
} from "../middleware/authMiddleware.js";
import {
  checkResetToken,
  githubLogin,
  googleLogin,
  protectedRoute,
} from "../controllers/authController.js";

//////////// DONT FORGET TO CHANGE PRODUCTION SETTINGS IN COOKIE CREATION AND DELETION FUNCIONS

const router = express.Router();

///////////// Oauth google

router.get("/oauth/google", googleLogin);

///////////// Oauth github

router.get("/oauth/github", githubLogin);

///////////// Protected Routes

router.get("/protected-route", verifyUserToken, protectedRoute);

///////////// Reset Password Token Check

router.post("/check-reset-token", checkResetToken);

export default router;
