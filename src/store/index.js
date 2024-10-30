import { configureStore } from "@reduxjs/toolkit";
import sertificateReduser from "./SertificateSlice";

const store = configureStore({
  reducer: {
    sertificate: sertificateReduser,
  },
});
export default store;
