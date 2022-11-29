import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type TPizza = {
  id: number;
  title: number;
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
};

interface IPizzaSliceState {
  items: TPizza[];
  isLoading: boolean;
  error: string;
}

const initialState: IPizzaSliceState = {
  items: [],
  isLoading: false,
  error: "",
};

export type TSearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  searchValue: string;
  currentPage: string;
};

//createAsyncThunk<TPizza[], TFetchPizzaArgs> можно типизировать так,
// Первым параметром пишем возвращаемый тип --- TPizza[]
// Вторым параметром пишем тип аргументов --- TFetchPizzaArgs
// Второй параметр по умолчанию VOID
export const getPizza = createAsyncThunk<TPizza[], TSearchPizzaParams>(
  "getPizza",
  async ({ category, sortBy, order, searchValue, currentPage }, thunkApi) => {
    try {
      const { data } = await axios.get<TPizza[]>(
        `https://63734e9a348e947299088973.mockapi.io/items?&page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(console.log(error));
    }
  }
);

const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizza[]>) {
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
      .addCase(getPizza.rejected, (state) => {
        state.isLoading = false;
        state.error = "error";
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
