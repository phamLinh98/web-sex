import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../configs/envConfig.js";
import bcrypt from "bcryptjs";
import "../configs/firebaseConfig.js";
import admin from "firebase-admin";
import {
  clearCookies,
  getCookieToken,
  validateRegisterInput,
} from "../utlis/auth.js";
const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  // eslint-disable-next-line no-undef
  const user = await User.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }
  const error = validateRegisterInput(email, password);
  if (error) {
    return res.status(400).send(error);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  const newUser = new User({ email, password: hashPassword, type: "local" });
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

authRoute.post("/logout", (req, res) => {
  clearCookies(res);
  return res.send("Logout Success");
});

// when call api verify will be check token have role to logout, if role is ok will be clear token ...next will be into api logout
authRoute.get("/verify", (req, res) => {
  const token = getCookieToken(req).token;
  if (!token) {
    return res.send("Not Logged In");
  }
  try {
    const verified = jwt.verify(token, envConfig.JWT_SECRET);
    return res.send(!!verified);
  } catch (err) {
    return res.send("Invalid Token");
  }
});

authRoute.get("/verify-bearror-token", async (req, res) => {
  const bearerToken = req.headers.authorization;
  console.log(bearerToken);
  if (!bearerToken) {
    return res.send("Not Logged In");
  }
  const token = bearerToken.split(" ")[1];
  console.log(token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid Token");
  }
});

export default authRoute;
