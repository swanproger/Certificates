import { createSlice } from "@reduxjs/toolkit";

const sertificateSlice = createSlice({
  name: "sertificate",
  initialState: {
    params: {
      name: "",
      discount: "",
      summa: "",
    },
    humanData: {
      name: "",
      number: "",
      massage: "",
      mail: "",
    },
  },
  reducers: {
    setSertificate(state, action) {
      return {
        ...state,
        params: {
          name: action.payload.NAME,
          discount: action.payload.DISCOUNT,
          summa: action.payload.SUMMA,
        },
      };
    },
    setHumanData(state, action) {
      return {
        ...state,
        humanData: {
          ...state.humanData,
          [action.payload.name]: action.payload.value,
        },
      };
    },
  },
});
export const { setSertificate, setHumanData } = sertificateSlice.actions;
export default sertificateSlice.reducer;
