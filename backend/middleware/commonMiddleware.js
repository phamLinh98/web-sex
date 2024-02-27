import cors from "cors";
import bodyParser from "body-parser";

export const corsConfig = cors({
  origin: [
    "http://localhost:3000",
    "http://192.168.0.5:3000",
    "http://localhost:3344",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
});

export const commonMiddlewares = [
  bodyParser.json({ limit: "30mb", extended: true }),
  corsConfig,
];
