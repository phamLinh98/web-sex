import jwt from "jsonwebtoken";
import { envConfig } from "../configs/envConfig.js";

export const decodeLoginUser = (req, res, next) => {
  if (req.signedCookies.token) {
    try {
      req.loginUser = jwt.verify(req.signedCookies.token, envConfig.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  next();
};
export const authentcatedMiddleware = (req, res, next) => {
  const loginUser = req.loginUser;
  const isLogin = loginUser && loginUser.id;
  if (isLogin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticated = [decodeLoginUser, authentcatedMiddleware];
//decodeLoginUser: check trong cookie co token hay khong  -> co thi giai ma (xac nhan day chinh la token cua minh)
