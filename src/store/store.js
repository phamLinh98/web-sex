import { graphSlice } from "../graphControl/+state/reducer.js";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    graph: graphSlice.reducer,
  },
});
