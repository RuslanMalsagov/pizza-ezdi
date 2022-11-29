import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

/*
RootState - это глобальный стейт который будет содержать в себе
типизацию => (filter, cart, pizza). То есть все эти типизированные стейты
будут находиться внутри одного RootState

ReturnType - это специальная команда TS которая 
возвращает тип любого содержимого функции.

В данном случае мы из функции getState вытаскиваем типы наших стейтов

А еще проще говоря, весь тип твоего redux хранится в RootState)))
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
