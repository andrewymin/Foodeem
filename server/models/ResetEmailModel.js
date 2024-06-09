import mongoose from "mongoose";

const resetEmail = new mongoose.Schema({
  // for when user requests password reset link, later deleted on completion or expried time reached
  email: String,
  token: String,
  expireAt: {
    type: Date,
    default: Date.now,
    expires: EXPIRE_AGE, // Document will expire after 180 sec
  },
});

const ResetEmail = mongoose.model("resetEmail", resetEmail);

export default ResetEmail;
