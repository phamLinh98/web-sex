import { createBrowserRouter } from "react-router-dom";
import Home from "../home/home";
import ErrorPage from "../error/error";
import Layout from "../layouts/Layout";
import GraphControl from "../graphControl/graph";
import Parent from "../demo/cha";
import Children from "../demo/con";
import Emut from "../demo/emut";
import AuthentcationLayout from "../layouts/AuthenticationLayout";
import LoginApp from "../login/LoginApp";

const routesConfigs = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginApp />,
      },
      {
        element: <AuthentcationLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "graph",
            element: <GraphControl />,
          },
        ],
      },
    ],
  },
  {
    path: "cha",
    element: <Parent />,
    children: [
      {
        path: "con",
        element: <Children />,
      },
      {
        path: "conthu",
        element: <Emut />,
      },
    ],
  },
];
const router = createBrowserRouter(routesConfigs);
export default router;
