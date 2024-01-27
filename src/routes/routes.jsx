import { createBrowserRouter } from "react-router-dom";
import Home from "../home/home";
import ErrorPage from "../error/error";
import Layout from "../layouts/Layout";
import GraphControl from "../graphControl/graph";

const routesConfigs = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "home",
        children: [
          {
            path: "graph",
            element: <GraphControl />,
          },
        ],
      },
    ],
  },
  {
    path: "error",
    element: <ErrorPage />,
  },
];
const router = createBrowserRouter(routesConfigs);
export default router;
