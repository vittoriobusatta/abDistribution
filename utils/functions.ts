import { createAsyncThunk } from "@reduxjs/toolkit";
type CartActionFunction = (item: any) => Promise<any>;

export const genericCartAction = (
  type: string,
  actionFunction: CartActionFunction
) => {
  return createAsyncThunk(type, async (item: any, { rejectWithValue }) => {
    try {
      const result = await actionFunction(item);
      return {
        item,
        result,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  });
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
