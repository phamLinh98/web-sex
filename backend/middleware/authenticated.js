import jwt from "jsonwebtoken";
import { getCookieToken } from "../utlis/auth.js";
import { envConfig } from "../configs/envConfig.js";

export const decodeLoginUser = (req, res, next) => {
  const token = getCookieToken(req).token;
  if (token) {
    req.loginUser = jwt.verify(token, envConfig.JWT_SECRET);
  }
  console.log(req.loginUser);
  next();
};
export const authentcatedMiddleware = (req, res, next) => {
  const loginUser = req.loginUser;
  const isLogin = loginUser && loginUser.id;
  if (isLogin) {
    next();
  } else {
    res.send("You are not authenticated. Please login first");
  }
};

export const authenticated = [decodeLoginUser, authentcatedMiddleware];