import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

function connectToDatabase() {
  mongoose
    .connect(envConfig.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err);
      console.log("Retry after 5s");
      setTimeout(connectToDatabase, 5000);
    });
}

connectToDatabase();
