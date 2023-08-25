export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
  attributes?: any;
};

export type CreateCartItem = {
  merchandiseId: string;
  variantQuantity: number;
  cartId?: string;
};

export type AddToCartItem = {
  cartId: string | null;
  merchandiseId: string;
  variantQuantity: number;
};

export type RemoveToCartItem = {
  cartId: string | null;
  lineId: string;
};