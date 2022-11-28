import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const getPizza = createAsyncThunk(
  "getPizza",
  async ({ category, sortBy, order, searchValue, currentPage }, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://63734e9a348e947299088973.mockapi.io/items?&page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
      );
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(console.log(error));
    }
  }
);

const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getPizza.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPizza.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
