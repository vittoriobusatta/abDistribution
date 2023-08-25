import {
  addToCart,
  createCart,
  removeToCart,
} from "@redux/actions/cart";
import { createSlice } from "@reduxjs/toolkit";
import { updateCartInfo } from "@utils/functions";

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    products: [],
    chargeAmount: 0,
    totalQuantity: 0,
    cartId: null,
  },
  reducers: {
    clearCart: (state) => {
      state.products = [];
      state.chargeAmount = 0;
      state.totalQuantity = 0;
      state.cartId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCart.fulfilled, (state, action) => {
      const { item, cartCreated } = action.payload;
      updateCartInfo(state, cartCreated, item, cartCreated.id);
    });
    builder.addCase(createCart.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { item, cartAdded } = action.payload;
      updateCartInfo(state, cartAdded, item);
    });
    builder.addCase(addToCart.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      const { item, cartRemoved } = action.payload;
      updateCartInfo(state, cartRemoved, item);
    });
  },
});

export default cartReducer.reducer;
