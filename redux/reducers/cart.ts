import { addToCart, createCart, removeToCart } from "@redux/actions/cart";
import { createSlice } from "@reduxjs/toolkit";
import { roundToTwoDecimals, updateCartInfo } from "@utils/functions";

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
    optimisticCreateCart: (state, action) => {
      const { item } = action.payload;
      state.products.push({
        item: {
          ...item,
          cartId: null,
        },
      });
      state.cartId = null;
      state.checkoutUrl = null;
      state.totalQuantity += item.variantQuantity;
      state.chargeAmount = roundToTwoDecimals(state.chargeAmount + item.price * item.variantQuantity);
    },
    optimisticAddToCart: (state, action) => {
      const { item } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.item.merchandiseId === item.merchandiseId
      );
      console.log("existingProduct", existingProduct);

      if (existingProduct) {
        existingProduct.item.variantQuantity += item.variantQuantity;
      } else {
        state.products.push({
          item: {
            ...item,
            cartId: state.cartId,
          },
        });
      }
      state.totalQuantity += item.variantQuantity;
      state.chargeAmount = roundToTwoDecimals(state.chargeAmount + item.price * item.variantQuantity);
    },
    optimisticRemoveToCart: (state, action) => {
      const { item } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.item.id === item.id
      );

      if (
        state.products[existingProductIndex].item.variantQuantity >
        item.variantQuantity
      ) {
        state.products[existingProductIndex].item.variantQuantity -=
          item.variantQuantity;
        state.totalQuantity -= item.variantQuantity;
        state.chargeAmount = roundToTwoDecimals(state.chargeAmount - item.price * item.variantQuantity);
      } else {
        // Capture the quantity and price of the item being removed
        const removedQuantity =
          state.products[existingProductIndex].item.variantQuantity;
        const removedAmount =
          state.products[existingProductIndex].item.price * removedQuantity;
        state.products.splice(existingProductIndex, 1);
        state.totalQuantity -= removedQuantity;
        state.chargeAmount = roundToTwoDecimals(state.chargeAmount - removedAmount);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCart.fulfilled, (state, action) => {
      const { item, result } = action.payload;
      updateCartInfo(state, result, item, result.id);
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { item, result } = action.payload;
      updateCartInfo(state, result, item);
    });
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      const { item, result } = action.payload;
      updateCartInfo(state, result, item);
    });
  },
});

export const {
  clearCart,
  optimisticCreateCart,
  optimisticRemoveToCart,
  optimisticAddToCart,
} = cartReducer.actions;

export default cartReducer.reducer;
