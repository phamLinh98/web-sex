import { getGraph, createGraph } from "../../services/graphServices.js";
import { loadedData, loadingData, error } from "./action.js";
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

// export function createData({ title }) {
//   return async (dispatch) => {
//     try {
//       const newData = await createGraph({ title });
//       if (newData.title === title) {
//         dispatch(refeshData);
//       }
//     } catch (error) {
//       dispatch({ type: "graph/error", payload: "Loi Adding Data" });
//     }
//   };
// }
