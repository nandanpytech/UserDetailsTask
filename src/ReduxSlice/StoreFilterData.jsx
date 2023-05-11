import { createSlice } from "@reduxjs/toolkit";

const filterStore = createSlice({
  name: "filter",
  initialState: {
    storeItems: [],
  },
  reducers: {
    setFilter: (state, action) => {
        state.storeItems = action.payload;
    },
  },
});

export const { setFilter } = filterStore.actions;
export default filterStore.reducer;
