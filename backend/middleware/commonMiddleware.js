import cors from "cors";
import bodyParser from "body-parser";

export const corsConfig = cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

export const commonMiddlewares = [
  bodyParser.json({ limit: "30mb", extended: true }),
  corsConfig,
];
