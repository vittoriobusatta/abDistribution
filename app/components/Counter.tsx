"use client";

import { addToCart, createCart, removeToCart } from "@redux/actions/cart";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { optimisticAddToCart, optimisticCreateCart } from "@redux/reducers/cart";
import { ItemToSent } from "@typage/cart";
import { productExistsInCart } from "@utils/functions";
import Image from "next/image";
import { useMemo } from "react";

export default function Home({ product }) {
  const dispatch = useAppDispatch();
  const { cartId, products } = useAppSelector((state) => state.cart);
  const cart = useAppSelector((state) => state.cart);

  const variants: any = [];
  product.variants.edges.map((item: any) => {
    variants.push(item.node);
  });

  let variant = variants.find((variant: any) => variant.availableForSale);
  if (!variant) {
    variant = variants[0];
  }

  const item: ItemToSent = useMemo(
    () => ({
      merchandiseId: variant.id,
      title: product.title,
      handle: product.handle,
      productType: product.productType,
      variantQuantity: 1,
      cartId,
      image: {
        src: variant.image.url,
        alt: variant.image.altText,
      },
      price: variant.price.amount,
    }),
    [variant, product, cartId]
  );

  console.log("products", products);

  const handleAddToCart = (item) => {
    dispatch(optimisticCreateCart({ item }));

    // if (productExistsInCart(item, products)) {
    dispatch(createCart(item));
    // }
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <button
        onClick={() => {
          handleAddToCart(item);
        }}
      >
        Create Cart
      </button>
      <button
        onClick={() => {
          dispatch(optimisticAddToCart({ item }));
          // dispatch(addToCart(item));
        }}
      >
        Add to Cart
      </button>
      {products?.map((item: any, index) => {
        const { image, title, variantQuantity, price } = item.item;
        const { id } = item?.line ?? {};
        return (
          <div key={index}>
            <h2>{title}</h2>
            <Image src={image.src} alt={image.alt} width={120} height={300} />
            <p>{variantQuantity}</p>
            <p>{price}</p>
            <button
              onClick={() => {
                dispatch(
                  removeToCart({
                    cartId,
                    lineId: id,
                    item,
                  })
                );
              }}
            >
              Remove to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}
