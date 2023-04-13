import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../reducers/ContactReducer";

export const appStore = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
