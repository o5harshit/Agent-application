import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slice/adminAuthSlice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});