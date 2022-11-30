import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TItemInc } from "../../pages/CartItem";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";

export type TCartItem = {
  id: number;
  type: string;
  name: string;
  size: number;
  price: number;
  imageUrl: string;
  count: number;
};

interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TCartItem>) {
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
    itemInc(state, action: PayloadAction<TItemInc>) {
      const findItem = state.items.find((el) => el.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    itemDec(state, action: PayloadAction<number>) {
      const findItem = state.items.find((el) => el.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeProduct(state, action: PayloadAction<number>) {
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
export const selectCart = (state: RootState) => state.cart;

/*
selectCertItemById - функция принимает параметр id который
она будет использовать в следующей функции и там уже
будет производить сравнение
 */
export const selectCertItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { itemInc, itemDec, removeProduct, addProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
