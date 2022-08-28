import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  items: [],
  totalAmount: 0,
  token: null,
};
console.log(initial_state);

const cartSLice = createSlice({
  name: "cart",
  initialState: initial_state,
  reducers: {
    addToCart(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.quantity * action.payload.price;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + action.payload.quantity;
      } else {
        state.items.push({
          id: action.payload.id,
          quantity: action.payload.quantity,
          price: action.payload.price,
          name: action.payload.name,
          imageUrl: action.payload.imageUrl,
        });
      }
    },

    removeFromCart(state, action) {
      const clickedItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.totalAmount = state.totalAmount - clickedItem.price;

      if (clickedItem.quantity !== 0) {
        clickedItem.quantity = clickedItem.quantity - 1;
      }
      if (clickedItem.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    deleteFromCart(state, action) {
      const clicked = state.items.find((item) => item.id === action.payload);

      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = state.totalAmount - clicked.price * clicked.quantity;
    },

    increseItemInCart(state, action) {
      let clickedItem = state.items.find((item) => item.id === action.payload);
      clickedItem.quantity = clickedItem.quantity + 1;
      state.totalAmount = state.totalAmount + clickedItem.price;
    },
    getToken(state, action) {
      // state = { ...state };
      state.token = action.payload;
    },
    removeToken(state, action) {
      state.token = null;
    },
  },
});

export const cartActions = cartSLice.actions;

export default cartSLice;
