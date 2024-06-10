import { createCookie } from "../hooks/jwtCookie.js";
import { User } from "../models/userModel.js";
import ResetEmail from "../models/ResetEmailModel.js";
import {
  getGoogleUser,
  getGoogleOAuthTokens,
} from "../hooks/googleFunctions.js";
import {
  getGithubOAuthTokens,
  getGithubUser,
} from "../hooks/githubFunctions.js";

const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://user-auth-frontend-teal.vercel.app/secret"
    : "http://localhost:5173";

const CANCEL_URI =
  process.env.NODE_ENV === "production"
    ? "https://user-auth-frontend-teal.vercel.app/"
    : "http://localhost:5173";

const googleLogin = async (req, res) => {
  // get the code from qs on the F.E. side
  const code = req.query.code;

  try {
    // Use callback to get googleoauthtokens used to
    //   get the id and access token from code
    const { id_token, access_token, refresh_token } =
      await getGoogleOAuthTokens({
        code,
      });

    // get google user data from google
    const googleUser = await getGoogleUser(access_token);
    // console.log("this is google user: ", googleUser);
    // Check if google user already created a regular user
    const user = await User.accountLink(googleUser, id_token, "google");
    // console.log(user._id);

    // set cookies
    createCookie(user._id, "token", res);
    createCookie(access_token, "access_token", res);
    createCookie(refresh_token, "refresh_token", res);
    // res.cookie("access_token", ac_token, { httpOnly: true, maxAge: 60000 }); // 1 min for testing, ms time
    // res.cookie("refresh_token", rf_Token, { httpOnly: true, maxAge: 180000 }); // 3 min for testing, ms time

    res.redirect(REDIRECT_URI);
  } catch (error) {
    console.error("User canceled google oauth: ", error);
    // User canceled the OAuth process
    res.redirect(CANCEL_URI);
    return;
  }
};

const githubLogin = async (req, res) => {
  // get the code from qs on the F.E. side
  const code = req.query.code;

  // Use callback to get github oauth tokens used to
  //   get access token from code since thats the only thing to get back
  const { access_token } = await getGithubOAuthTokens({
    code,
  });

  // get github user data from different github api calls
  const githubUser = await getGithubUser(access_token);
  // console.log(githubUser);

  // Check if github user already created a regular user or with other accounts
  const user = await User.accountLink(
    githubUser,
    githubUser.data.id.toString(),
    "github"
  );

  // set cookies
  createCookie(user._id, "token", res);

  res.redirect(REDIRECT_URI);
};

const protectedRoute = (req, res) => {
  // console.log(req.user); // req is from middleware req
  res.status(200).json({ authorized: req.user });
};

const checkResetToken = async (req, res) => {
  const token = req.query.resetToken;
  console.log(token);
  try {
    const resetUser = await ResetEmail.findOne({ token: token });
    if (!resetUser) return res.status(401).json({ msg: "token expired" });
    return res.status(200).json({ msg: "found user" });
  } catch (error) {
    console.log(error);
  }
};

export { googleLogin, githubLogin, checkResetToken, protectedRoute };
