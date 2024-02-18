import { Router } from "express";

const apiRoute = Router();

apiRoute.get("/users", (req, res) => {
  res.send("Users Route");
});

export default apiRoute;
