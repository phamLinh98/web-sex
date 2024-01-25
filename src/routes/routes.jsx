import { createBrowserRouter } from "react-router-dom";
import GraphControl from "../graphControl/graph";
import UploadPicture from "../uploadPicture/uploadPicture";
import Home from "../home/home";

const configRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/graph",
    element: <GraphControl />,
  },
  {
    path: "/upload",
    element: <UploadPicture />,
  },
];
const router = createBrowserRouter(configRouter);
export default router;
