import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

mongoose.connect(envConfig.MONGO_URI, {
  serverSelectionTimeoutMS: 0, // Thời gian chờ lựa chọn máy chủ
  socketTimeoutMS: 0, // Thời gian chờ của socket
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
