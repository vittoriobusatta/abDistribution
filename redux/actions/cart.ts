import { useAddToCart } from "@actions/cart/useAddToCart";
import { useCreateCart } from "@actions/cart/useCreateCart";
import { useRemoveToCart } from "@actions/cart/useRemoveToCart";
import {
  ADD_TO_CART,
  CREATE_CART,
  REMOVE_TO_CART,
} from "@redux/constants/cart";
import { AddToCartItem, CreateCartItem, RemoveToCartItem } from "@typage/cart";
import { genericCartAction } from "@utils/functions";

export type CreateCartItemOutput = {
  merchandiseId: string;
  variantQuantity: number;
  cardId: string;
};

export const createCart = genericCartAction(
  CREATE_CART,
  (item: CreateCartItem) => {
    return useCreateCart({
      merchandiseId: item.merchandiseId,
      quantity: item.variantQuantity,
    });
  }
);

export const addToCart = genericCartAction(
  ADD_TO_CART,
  (item: AddToCartItem) => {
    return useAddToCart({
      cartId: item.cartId,
      merchandiseId: item.merchandiseId,
      quantity: item.variantQuantity,
    });
  }
);

export const removeToCart = genericCartAction(
  REMOVE_TO_CART,
  (item: RemoveToCartItem) => {
    return useRemoveToCart({
      cartId: item.cartId,
      lineId: item.lineId,
    });
  }
);
