import { deleteCookie } from "../hooks/jwtCookie.js";

///////////// Clear cookies before logout
const logoutDeleteCookies = (req, res, next) => {
  // console.log("am I getting to this route");
  try {
    deleteCookie("token", res);
    deleteCookie("access_token", res);
    deleteCookie("refresh_token", res);
    // needed these three params for cookies to actual be deleted
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    next(); // using middleware to ensure that the cookies clear before sending 200 status since it's been doing that in vercel
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: error.message });
  }
};

export { logoutDeleteCookies };
