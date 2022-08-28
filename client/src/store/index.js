import { configureStore } from "@reduxjs/toolkit";

import cartSLice from "./CartSlice";

const store = configureStore({
  reducer: { cart: cartSLice.reducer },
});

export default store;
