import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { envConfig } from "../configs/envConfig.js";

export const corsConfig = cors({
  origin: ["http://localhost:3000","http://192.168.0.5:3000","http://localhost:3344"],
  credentials: true,
});

export const commonMiddlewares = [
  bodyParser.json({ limit: "30mb", extended: true }),
  corsConfig,
  cookieParser(envConfig.COOKIE_SECRET),
];
