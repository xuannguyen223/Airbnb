import { configureStore } from "@reduxjs/toolkit";
import listViTriReducer from "./reducers/listViTriReducer";

export const store = configureStore({
  reducer: {
    listViTriReducer,
  },
});
