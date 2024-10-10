import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, "secretKey");
      req.user = await authModel.findById(userID).select("--password");
      next();
    } catch (error) {
      return res.status(400).json({
        message: "unAuthorized User",
      });
    }
  } else {
    return res.status(400).json({
      message: "unAuthorized User",
    });
  }
};

export default checkIsUserAuthenticated;
