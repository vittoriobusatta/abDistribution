import { addToCart, createCart, removeToCart } from "@redux/actions/cart";
import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToProducts,
  removeItemFromProducts,
  updateCartInfo,
} from "@utils/functions";

const initialState = {
  products: [],
  chargeAmount: 0,
  totalQuantity: 0,
  cartId: null,
  checkoutUrl: null,
};

export const cartReducer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: () => initialState,
    optimisticRemoveToCart: (state, action) => {
      state.products = removeItemFromProducts(
        state.products,
        action.payload.item.id
      );
    },
    cancelOptimisticRemoveToCart: (state, action) => {
      state.products = addItemToProducts(state.products, action.payload.item);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCart.fulfilled, (state, action) => {
      const { item, result } = action.payload;
      updateCartInfo(state, result, item, result.id);
    });
    builder.addCase(createCart.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { item, result } = action.payload;
      updateCartInfo(state, result, item);
    });
    builder.addCase(addToCart.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      const { item, result } = action.payload;
      updateCartInfo(state, result, item);
    });
    builder.addCase(removeToCart.rejected, (_, action) => {
      console.error(action.payload);
    });
  },
});

export const {
  clearCart,
  optimisticRemoveToCart,
  cancelOptimisticRemoveToCart,
} = cartReducer.actions;

export default cartReducer.reducer;
