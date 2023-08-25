import { useAddToCart } from "@actions/cart/useAddToCart";
import { useCreateCart } from "@actions/cart/useCreateCart";
import { useRemoveToCart } from "@actions/cart/useRemoveToCart";
import {
  ADD_TO_CART,
  CREATE_CART,
  REMOVE_TO_CART,
  CLEAR_CART,
} from "@redux/constants/cart";
import { createAsyncThunk } from "@reduxjs/toolkit";

type CartItem = {
  cartId: string;
  merchandiseId: string;
  handle: string;
  id: string;
  title: string;
  variantQuantity: number;
  lineId: string;
};

export const createCart = createAsyncThunk(
  CREATE_CART,
  async (item: CartItem, { rejectWithValue }) => {
    try {
      const cartCreated = await useCreateCart(
        item.merchandiseId,
        item.variantQuantity
      );
      return { item, cartCreated };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (item: CartItem, { rejectWithValue }) => {
    try {
      const cartAdded = await useAddToCart(
        item.merchandiseId,
        item.cartId,
        item.variantQuantity
      );
      return { item, cartAdded };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const removeToCart = createAsyncThunk(
  REMOVE_TO_CART,
  async (item: CartItem, { rejectWithValue }) => {
    try {
      const cartRemoved = await useRemoveToCart(item.cartId, item.lineId);
      return { item, cartRemoved };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);