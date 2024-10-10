import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authModel.findOne({ email });
        if (!isUser) {
          const genSalt = await bcryptjs.genSalt(10);
          const hashPassword = await bcryptjs.hash(password, genSalt);
          const newUser = new authModel({
            username,
            email,
            password: hashPassword,
          });

          const savedUser = await newUser.save();
          if (savedUser) {
            res.status(200).json({
              message: "User created successfully",
            });
          }
        } else {
          return res.status(400).json({
            message: "User already exist",
          });
        }
      } else {
        res.status(400).json({
          message: "Please enter all fields",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Internal Server Error",
      });
    }
  };
  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const isEmail = await authModel.findOne({ email: email });
        if (isEmail) {
          if (
            isEmail.email === email &&
            (await bcryptjs.compare(password, isEmail.password))
          ) {
            const token = jwt.sign({ userID: isEmail.id }, "secretKey", {
              expiresIn: "24h",
            });

            return res.status(200).json({
              message: "Login successful",
              token,
              name: isEmail.username,
            });
          } else {
            return res.status(400).json({
              message: "Wrong password or email",
            });
          }
        } else {
          return res.status(400).json({
            message: "email not found",
          });
        }
      } else {
        return res.status(400).json({
          message: "all fields are required",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
}

export default AuthController;
