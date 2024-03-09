import { createBrowserRouter } from "react-router-dom";
import Home from "../home/home";
import ErrorPage from "../error/error";
import Layout from "../layouts/Layout";
import GraphControl from "../graphControl/graph";
import AuthentcationLayout from "../layouts/AuthenticationLayout";
import LoginApp from "../login/LoginApp";
import UseCallBack from "../demo/useCallback";
import Register from "../login/Register";

const routesConfigs = [
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "demo",
        element: <UseCallBack />,
      },
      {
        path: "login",
        element: <LoginApp />,
      },
      {
        path: "/register",
        element: <Register />,
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
];
const router = createBrowserRouter(routesConfigs);
export default router;
