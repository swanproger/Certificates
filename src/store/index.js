import { configureStore } from "@reduxjs/toolkit";
import certificatesReduser from "./certificatesSlice";

const store = configureStore({
  reducer: {
    certificates: certificatesReduser,
  },
});
export default store;
