import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../configs/envConfig.js";
import bcrypt from "bcryptjs";
import "../configs/firebaseConfig.js";
import admin from "firebase-admin";
import {
  clearCookies,
  validateRegisterInput,
} from "../utlis/auth.js";
const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }
  const error = validateRegisterInput(email, password);
  if (error) {
    return res.status(400).send(error);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashPassword, type: "local" });
  await newUser.save();
  res.send("User created");
});

// verify authentication by local password will be get a token from that,
authRoute.post("/login", async (req, res) => {
  // check if user exist
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("Invalid login");
  }
  // check if password is correct
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
      expiresIn: "1day",
    }
  );
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true /* httpOnly: true will prevent javascript from accessing cookies */,
    secure:
      envConfig.ENV ===
      "product" /* secure: true will only send cookie over https */,
    sameSite: "lax" /* sameSite: lax will prevent csrf attack */,
    signed: true /* signed: true will use secret key to encrypt cookie */,
  });

  return res.send("Login Success");
});

authRoute.get("/logout", (req, res) => {
  clearCookies(res);
  return res.send("Logout Success");
});

// get token from frontend after login successfully google firebase
authRoute.post('/sso-login', async (req, res) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.send('Not logged in');
  }
  const token = bearerToken.split(' ')[1];
  // This token is firebase token
  try {
    // use firebase verifyIdToken to verify token
    const loginUser = await admin.auth().verifyIdToken(token);

    // If loginUser.email is not exist in database, create new user
    const user = await User.findOne({
      email: loginUser.email,
     // type: 'firebase',
    });
    console.log(user);
    if (!user) {
      const newUser = new User({
        email: loginUser.email,
        type: 'firebase',
        displayName: loginUser.name,
        avatar: loginUser.picture,
      });
      await newUser.save();
    }

    // Create jwt token and save in cookie in 1 day
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: loginUser.email,
        displayName: loginUser.name,
        avatar: loginUser.picture,
        role: 'user',
      },
      envConfig.JWT_SECRET,
      {
        expiresIn: '1day',
      },
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: envConfig.ENV === 'product',
      sameSite: 'lax',
      signed: true,
    });

    return res.send('Login success');
  } catch (error) {
    return res.send('Invalid token');
  }
});;

export default authRoute;
