import { Router } from "express";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { envConfig } from "../configs/envConfig.js";
import bcrypt from "bcryptjs";
const authRoute = Router();

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);
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
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  const user = await User.findOne({ email, password: hashPassword });
  if (user) {
    const token = jwt.sign({ id: user._id, email: user }, envConfig.JWT_SECRET);
    console.log("token", token);
    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.send("Login success");
  }
  res.send("Invalid login");
});

export default authRoute;
