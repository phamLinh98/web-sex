import express from "express";
import allRoutes from "./routes/allRoutes.js";
import "./configs/dbConfig.js";
import { errorMiddlewares } from "./middleware/errorMiddleware.js";
import { commonMiddlewares } from "./middleware/commonMiddleware.js";
import { envConfig } from "./configs/envConfig.js";

const app = express();

app.use(commonMiddlewares);

app.use(allRoutes);

app.use(errorMiddlewares);

app.listen(envConfig.PORT, () => {
  console.log(`Server running on port ${envConfig.PORT}`);
});
