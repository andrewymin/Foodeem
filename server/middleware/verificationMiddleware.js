import User from "../models/userModel.js";
import TempUser from "../models/tempUserModel.js";

const verifyPageMiddleware = async (req, res, next) => {
  const verifyToken = await req.cookies.verifyToken; // id of user
  if (!verifyToken) return res.status(401).json("Unauthorized no verify token");

  jwt.verify(
    verifyToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      // error in token return 401
      if (err) return res.status(401);
      // use decoded id to find temp user before they completed verification
      const tempUser = await User.findById(decodedToken._id);
      // checks if tempUser is null which means user has git/google
      //  credentials already in in db thus need to use TempUser db
      //  instead of regular User model
      if (!tempUser) {
        const tempGitOrGoUser = await TempUser.findById(decodedToken._id);
        // error checking with if statement
        if (tempGitOrGoUser) req.tempUser = true;
        // if no tempUser despite verifyToken being present return false/401
        else return res.status(401);
        next();
        // stop code here with return
        return;
      }

      // console.log(tempUser);
      // use found user to send "true" to F.E. for ACCESS_V_PAGE to be true
      if (tempUser) req.tempUser = true;
      // if no tempUser despite verifyToken being present return false/401
      else return res.status(401);

      next();
    }
  );
};

export { verifyPageMiddleware };
