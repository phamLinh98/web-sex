import { Router } from "express";

const apiRoute = Router();

apiRoute.get("/users", (req, res) => {
  const loginUser = req.loginUser;
  res.send({ loginUser });
});

export default apiRoute;
