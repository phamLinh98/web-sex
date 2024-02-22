import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../configs/envConfig.js";
import bcrypt from "bcryptjs";
import { clearCookies } from "../utlis/auth.js";
const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  // eslint-disable-next-line no-undef
  const user = await User.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  const newUser = new User({ email, password: hashPassword });
  await newUser.save();
  res.send("User created");
});

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("Invalid login");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    clearCookies(res);
    return res.send("Invalid login");
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    envConfig.JWT_SECRET
  );
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true, // true: cookie is not accessible from javascript, false: cookie is accessible from javascript
  });

  return res.send("Login Success");
});

export default authRoute;
