import { User, TempUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { createCookie, deleteCookie } from "../hooks/jwtCookie.js";
import {
  generateRandomSixDigitNumber,
  verifyEmail,
} from "../hooks/verifyCodeGen.js";

// const MAX_AGE = 180000;

///////////// login user
const requestCode = async (req, res) => {
  const newExpireTime = new Date(Date.now() + 180 * 1000);
  const newCode = generateRandomSixDigitNumber();
  const verifyToken = req.cookies.verifyToken;
  // console.log(verifyToken);
  if (!verifyToken) return res.status(401).json("Unauthorized no vToken"); // this doesn't allow the refresh token to work!

  if (verifyToken) {
    jwt.verify(
      verifyToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err)
          return res
            .status(401)
            .json(
              "Unauthorized no verify token. Please go back and sign-up again."
            );
        const tempUser = await TempUser.findById(decodedToken._id);
        if (tempUser) {
          const user = await TempUser.findByIdAndUpdate(
            decodedToken._id,
            {
              verificationCode: { vCode: newCode, expireAt: newExpireTime },
            },
            { new: true }
          );

          // console.log(user);
          console.log(newCode);
          return res
            .status(200)
            .json({ msg: "New Code created and updated in db." });
        }

        const user = await User.findByIdAndUpdate(
          decodedToken._id,
          {
            verificationCode: { vCode: newCode, expireAt: newExpireTime },
          },
          { new: true }
        );
        console.log(user);
        console.log(newCode);
        // verifyEmail(newCode);

        res.status(200).json({ msg: "New Code created and updated in db." });
      }
    );
  }
};

const verifyCode = async (req, res) => {
  const userCode = await req.body.userCode; // user verification code
  // console.log("this is the user inputted code: ", userCode);
  //   console.log("user completed code is: ", userCode);
  const verifyToken = await req.cookies.verifyToken; // id of user
  if (!verifyToken) return res.status(401).json("Unauthorized no verify token");

  if (verifyToken) {
    jwt.verify(
      verifyToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) return res.status(401);

        // this is if user is trying to login using same email as their google/github login
        //   this check if the tempUser expired before they tried to signup
        const tempUser = await TempUser.findById(decodedToken._id);
        // console.log(tempUser);
        if (tempUser) {
          if (tempUser.verificationCode.vCode != userCode)
            return res
              .status(400)
              .json(
                "Incorrect code. Either request for another code or try again."
              );
          // tempUser still exists and checking if the codes match
          if (tempUser.googleUserId) {
            // this is updating original google user with temp data
            const user = await User.findByIdAndUpdate(tempUser.googleUserId, {
              password: tempUser.password,
              verified: true,
            });
            createCookie(user._id, "token", res);
            deleteCookie("verifyToken", res);
            // after updating google user info, delete tempuser
            tempUser.deleteOne();
            return res.status(200).json({
              isAuth: true,
              allowVerify: false,
            });
          } else {
            // this is updating original google user with temp data
            const user = await User.findByIdAndUpdate(tempUser.githubUserId, {
              password: tempUser.password,
              verified: true,
            });
            createCookie(user._id, "token", res);
            deleteCookie("verifyToken", res);
            // after updating google user info, delete tempuser
            tempUser.deleteOne();
            return res.status(200).json({
              isAuth: true,
              allowVerify: false,
            });
          }
        }

        const user = await User.findById(decodedToken._id);
        // check if user timeout expired
        if (!user)
          return res.status(400).json("Please go back and try sign up again.");
        // double check if user existed however got deleted right when call was sent
        if (!user.verificationCode.vCode)
          return res
            .status(400)
            .json(
              "Could not find verification code. Please get new code or try sign up again"
            );

        if (user.verificationCode.vCode != userCode) {
        }
        // here vcode has to equal usercode, thus use 'set' to update
        else {
          user.set({
            verified: true,
            verificationCode: null, // this cancels user deletion by expire
          });
          // saving updates to retrieved user
          const updatedUser = await user.save();

          // create a cookie of updatedUser.id for authCheck and retrieval for user data for dashboard
          createCookie(updatedUser._id, "token", res);
          res.clearCookie("verifyToken");

          res.status(200).json({
            isAuth: true,
            allowVerify: false,
          });
        }
      }
    );
  }
};

const verifyPage = (req, res) => {
  // console.log(req.user); // req is from middleware req
  //   console.log(req.tempUser);
  res.status(200).json({ accessPage: { allow: req.tempUser } });
};

export { requestCode, verifyCode, verifyPage };
