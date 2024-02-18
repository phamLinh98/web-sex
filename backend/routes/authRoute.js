import { Router } from "express";
import { Schema, model } from "mongoose";
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
authRoute.get("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email });
  res.send("Register Route");
  if (user) {
    return res.send("User already exists");
  }
  const newUser = new User({
    username,
    password,
  });
  await newUser.save();
  res.send("Register route");
});

authRoute.get("/login", async (req, res) => {});

export default authRoute;
