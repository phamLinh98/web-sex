import { Router } from "express";
import authRoute from "./authRoute.js";
import apiRoute from "./apiRoute.js";
import { authenticated } from "../middleware/authenticated.js";

const allRoutes = Router();

allRoutes.use(authRoute);

allRoutes.use("/api", authenticated, apiRoute);

export default allRoutes;
