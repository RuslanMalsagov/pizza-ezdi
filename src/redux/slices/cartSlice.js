import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.items.find((el) => el.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    itemInc(state, action) {
      const findItem = state.items.find((el) => el.id === action.payload.id);
      findItem.count++;
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    itemDec(state, action) {
      const findItem = state.items.find((el) => el.id === action.payload);
      findItem.count--;
    },
    removeProduct(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// selectCart селектор, та же JS функция.
export const selectCart = (state) => state.cart;

/*
selectCertItemById - функция принимает параметр id который
она будет использовать в следующей функции и там уже
будет производить сравнение
 */
export const selectCertItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const { itemInc, itemDec, removeProduct, addProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
