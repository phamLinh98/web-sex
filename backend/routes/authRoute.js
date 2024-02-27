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

// verify authentication by local password will be get a token from that,
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
  // this is assign token after login successfully
  const token = jwt.sign(
    { id: user._id, email: user.email },
    envConfig.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true, // true: cookie is not accessible from javascript, false: cookie is accessible from javascript
    signed: true, //true will be use secret key to encrypt the cookie
    sameSite: "none", // none will be allowed cross-site requests
    secure: envConfig.ENV === "product", //secure true will only send cookies over HTTPS
  });

  return res.send("Login Success");
});

authRoute.get("/logout", (req, res) => {
  clearCookies(res);
  return res.send("Logout Success");
});

// after authentication successfully by local password or sso google , check token and next step
authRoute.get("/verify", (req, res) => {
  const token = getCookieToken(req).token; // Get token from cookie
  if (!token) {
    return res.send("Not Logged In");
  }
  try {
    const verified = jwt.verify(token, envConfig.JWT_SECRET); //check that token
    return res.send(!!verified);
  } catch (err) {
    return res.send("Invalid Token");
  }
});

// get token from frontend after login successfully google firebase
authRoute.post("/sso-login", async (req, res) => {
  const bearerToken = req.headers.authorization;
  console.log(bearerToken);
  if (!bearerToken) {
    return res.send("Not Logged In");
  }
  const token = bearerToken.split(" ")[1];
  console.log(token);
  try {
    const loginUser = await admin.auth().verifyIdToken(token); // verify token from sso firebase google
    const user = await User.findOne({ email: loginUser.email });
    // if user not exist, create a new user
    if (!user) {
      const newUser = await new User({
        email: loginUser.email,
        role: "user",
        displayName: loginUser.name,
        avatar: loginUser.picture,
      });
      await newUser.save();
    }
    //create a new token and save to cookie, token info included user info
    const jwtToken = jwt.sign(
      { id: user._id, email: loginUser.email },
      envConfig.JWT_SECRET,
      {
        expiresIn: "7d", //token se het han trong 7 ngay
      }
    );
    //save to cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      signed: true,
      secure: envConfig.ENV === "product",
      sameSite: "none",
    });
    return res.send("Login Success");
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid Token");
  }
});

export default authRoute;
