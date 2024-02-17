import { Router } from "express";

const authRoute = Router();

authRoute.get("/login", (req, res) => {
  res.send("Login Route");
});

authRoute.get("/register", (req, res) => {
  res.send("Register Route");
});

export default authRoute;
