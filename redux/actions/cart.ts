import { useAddToCart } from "@actions/cart/useAddToCart";
import { useCreateCart } from "@actions/cart/useCreateCart";
import { useRemoveToCart } from "@actions/cart/useRemoveToCart";
import {
  ADD_TO_CART,
  CREATE_CART,
  REMOVE_TO_CART,
} from "@redux/constants/cart";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddToCartItem, CreateCartItem, RemoveToCartItem } from "@typage/cart";

export type CreateCartItemOutput = {
  merchandiseId: string;
  variantQuantity: number;
  cardId: string;
};

export const createCart = createAsyncThunk(
  CREATE_CART,
  async (item: CreateCartItem, { rejectWithValue }) => {
    try {
      const cartCreated = await useCreateCart({
        merchandiseId: item.merchandiseId,
        quantity: item.variantQuantity,
      });
      console.log("cartCreated", cartCreated);
      return { item, cartCreated };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (item: AddToCartItem, { rejectWithValue }) => {
    console.log("item", item);
    try {
      const cartAdded = await useAddToCart({
        cartId: item.cartId,
        merchandiseId: item.merchandiseId,
        quantity: item.variantQuantity,
      });
      return { item, cartAdded };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const removeToCart = createAsyncThunk(
  REMOVE_TO_CART,
  async (item: RemoveToCartItem, { rejectWithValue }) => {
    try {
      const cartRemoved = await useRemoveToCart({
        cartId: item.cartId,
        lineId: item.lineId,
      });
      return { item, cartRemoved };
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);
