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
  item: any;
};

export type ItemToSent = {
  merchandiseId: string;
  title: string;
  handle: string;
  productType: string;
  variantQuantity: number;
  cartId: string | null;
  image: {
    src: string;
    alt: string;
  };
  price: number;
};
