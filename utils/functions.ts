import { REMOVE_TO_CART } from "@redux/constants/cart";
import {
  cancelOptimisticRemoveToCart,
  optimisticRemoveToCart,
} from "@redux/reducers/cart";
import { createAsyncThunk } from "@reduxjs/toolkit";
type CartActionFunction = (item: any) => Promise<any>;

export const genericCartAction = (
  type: string,
  actionFunction: CartActionFunction
) => {
  return createAsyncThunk(
    type,
    async (item: any, { dispatch, rejectWithValue }) => {
      if (type === REMOVE_TO_CART) {
        dispatch(optimisticRemoveToCart(item));
      }
      try {
        const result = await actionFunction(item);
        return {
          item,
          result,
        };
      } catch (err) {
        if (type === REMOVE_TO_CART) {
          dispatch(cancelOptimisticRemoveToCart(item));
        }
        return rejectWithValue(err.message);
      }
    }
  );
};

export function updateCartInfo(
  state: any,
  cartInfo: any,
  item: any,
  cartId?: string
) {
  state.products = cartInfo.lines.edges.map((line) => {
    return {
      line: line,
      item: {
        handle: item.handle,
        id: item.id,
        title: item.title,
        variantQuantity: item.variantQuantity,
      },
    };
  });

  if (cartId) {
    state.cartId = cartInfo.id;
  }

  state.totalQuantity = cartInfo.totalQuantity;
  state.chargeAmount = cartInfo.cost.checkoutChargeAmount.amount;
  state.checkoutUrl = cartInfo.checkoutUrl;
}

export function removeItemFromProducts(products, itemId) {
  return products.filter((product) => product.item.id !== itemId);
}

export function addItemToProducts(products, item) {
  return [...products, item];
}
