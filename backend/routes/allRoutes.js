import { Router } from "express";
import authRoute from "./authRoute.js";

const allRoutes = Router();
allRoutes.use(authRoute);

export default allRoutes;
