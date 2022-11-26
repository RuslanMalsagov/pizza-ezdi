import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
