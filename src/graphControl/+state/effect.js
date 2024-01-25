import { getGraph } from "../../services/graphServices";
import { loadedData, loadingData } from "./action";
async function refeshData(dispatch) {
  dispatch(loadingData());
  try {
    const data = await getGraph();
    dispatch(loadedData(data));
  } catch (error) {
    dispatch({ type: "graph/error", payload: "Loi Feching Data" });
  }
}
export function getFromRefeshData() {
  return refeshData;
}
