import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

mongoose.connect(envConfig.MONGO_URI);
