"use client";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  clearCart,
  optimisticAddToCart,
  optimisticCreateCart,
  optimisticRemoveToCart,
} from "@redux/reducers/cart";
import { ItemToSent } from "@typage/cart";
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

  console.log("cart", cart);

  const handleAddToCart = (item) => {
    dispatch(optimisticCreateCart({ item }));
    // dispatch(createCart(item));
  };

  return (
    <div>
      <h1>{product.title}</h1>
      {products.length > 0 ? (
        <>
          <h1>Cart</h1>
          <button
            onClick={() => {
              dispatch(optimisticAddToCart({ item }));
              // dispatch(addToCart(item));
            }}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            handleAddToCart(item);
          }}
        >
          Create Cart
        </button>
      )}

      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </button>
      <h1>{cart.chargeAmount} €</h1>
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
                // dispatch(
                //   removeToCart({
                //     cartId,
                //     lineId: id,
                //     item,
                //   })
                // );
                dispatch(
                  optimisticRemoveToCart({
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
