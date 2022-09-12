import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducer/user";
import { exchangeSlice } from "./reducer/exchange";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    exchange: exchangeSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
