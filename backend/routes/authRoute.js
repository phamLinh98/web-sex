import { Router } from "express";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { envConfig } from "../configs/envConfig.js";
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
  const { username, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }
  const newUser = new User({ username, password });
  await newUser.save();
  res.send("User created");
});

authRoute.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("user", user);
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
