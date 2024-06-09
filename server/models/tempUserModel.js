import mongoose from "mongoose";

// Used for temp storing if GOOGLE user exists but they're trying to
//  use same email for regular sign-in, thus temp while user hasn't completed verification code to link accounts
const tempUserSchema = new mongoose.Schema({
  googleUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  githubUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
  verificationCode: verificationRequest,
});

const TempUser = mongoose.model("tempUser", tempUserSchema); // creating model of temp user here to be used in functions below for error corrections

export default TempUser;
