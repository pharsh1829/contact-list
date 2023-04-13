import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jsonData from "../constants/data";
const initialState = {
  masterList: [],
  list: [],
  activeList: [],
  page: 1,
  limitPerPage: 25,
  formData: {
    name: "",
    gender: "",
    nationality: "",
  },
  listType: 1,
};

export const listAllContacts = createAsyncThunk(
  "contact/listAll",
  async (_, { dispatch }) => {
    try {
      const arr = Array.from(Array(100)).map((_, i) => {
        let retData = { id: i + 1 };
        Object.entries(jsonData).map((k) => {
          retData[k[0]] = k[1].replace("{{COUNT}}", i + 1);
        });

        return { ...retData, modified: Date.now() };
      });
      return arr;
    } catch (err) {
      console.log(err);
    }
  }
);

export const contactReducer = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setSearchForm: (state, { payload }) => {
      state.formData = payload;
    },
    clearFilterData: (state, { payload }) => {
      state.formData = { name: "", gender: "", nationality: "" };
      state.list = state.masterList;
      state.page = 1;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    updateList: (state, { payload }) => {
      state.list = payload;
    },
    deleteItem: (state, { payload }) => {
      const items = state.masterList.filter((v) => v.id !== Number(payload));
      state.masterList = items;
      state.list = items;
      state.page = 1;
    },
    setSearchedValue: (state) => {
      let items = state.masterList;
      const filters = state.formData;

      if (filters.name) {
        items = items.filter((k) =>
          k.name.toLowerCase().includes(filters.name)
        );
      }
      if (filters.gender) {
        items = items.filter((k) =>
          k.gender.toLowerCase().includes(filters.gender)
        );
      }
      if (filters.nationality) {
        items = items.filter((k) =>
          k.nationality.toLowerCase().includes(filters.nationality)
        );
      }

      state.list = items;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listAllContacts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.masterList = payload;
    });
  },
});

export const {
  setSearchForm,
  clearFilterData,
  setPage,
  updateList,
  setSearchedValue,
  deleteItem,
} = contactReducer.actions;
export default contactReducer.reducer;
