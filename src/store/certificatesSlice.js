import { createSlice } from "@reduxjs/toolkit";

function mapCertObjToStoreItem(obj) {
  return {
    id: obj.ID,
    name: obj.NAME,
    discount: obj.DISCOUNT,
    summa: obj.SUMMA,
    price: obj.PRICE,
    primaryKey: obj.PRIMARYKEY,
    tableName: obj.TABLENAME,
  };
}

const certificatesSlice = createSlice({
  name: "certificates",
  initialState: {
    certs: [],
    selectedCert: null,
    humanData: {
      name: "",
      phone: "",
      message: "",
      email: "",
    },
  },
  reducers: {
    setSelectedCert(state, action) {
      return {
        ...state,
        selectedCert: {
          name: action.payload.name,
          discount: action.payload.discount,
          summa: action.payload.summa,
          id: action.payload.id,
          price: action.payload.price,
          primaryKey: action.payload.primaryKey,
          tableName: action.payload.tableName,
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

    setCerts(state, action) {
      return {
        ...state,
        certs: action.payload.map(mapCertObjToStoreItem),
      };
    },
  },
});

export const { setSelectedCert, setHumanData, setCerts } =
  certificatesSlice.actions;
export default certificatesSlice.reducer;
