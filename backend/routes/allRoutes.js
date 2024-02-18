import { Router } from "express";
import authRoute from "./authRoute.js";
import apiRoute from "./apiRoute.js";

const allRoutes = Router();
allRoutes.use(authRoute);
allRoutes.use("/api", apiRoute);
export default allRoutes;
