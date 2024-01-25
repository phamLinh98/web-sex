import { createSlice } from "@reduxjs/toolkit";

export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    loadingData: false,
    errorMessenger: "",
    data: [],
  },
  reducers: {
    loadingData: (state) => {
      state.loadingData = true;
    },
    loadedData: (state, action) => {
      state.loadingData = false;
      state.data = action.payload;
    },
    error: (state, action) => {
      state.loadingData = false;
      state.errorMessenger = action.payload;
    },
  },
});
export default graphSlice;
