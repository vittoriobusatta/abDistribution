import { addToCart, createCart, removeToCart } from "@redux/actions/cart";
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
      updateCartInfo({
        state,
        cartInfo: cartCreated,
        item,
        cartId: cartCreated.id,
      });
    });
    builder.addCase(createCart.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { item, cartAdded } = action.payload;
      updateCartInfo({ state, cartInfo: cartAdded, item });
    });
    builder.addCase(addToCart.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      const { item, cartRemoved } = action.payload;
      updateCartInfo({ state, cartInfo: cartRemoved, item });
    });
    builder.addCase(removeToCart.rejected, (_, action) => {
      console.error(action.payload);
    });
  },
});

export default cartReducer.reducer;
