"use client";

import { addToCart, createCart, removeToCart } from "@redux/actions/cart";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import Image from "next/image";

const item = {
  line_id:
    "gid://shopify/CartLine/34b64cb8-332d-4abc-a0dc-aaeb3eb6fca7?cart=c1-907adf1103af952e1e146bb668f7afde",
  id: "gid://shopify/ProductVariant/46769462346001",
  quantity: 2,
};

export default function Home() {
  const dispatch = useAppDispatch();
  const { cartId, products } = useAppSelector((state) => state.cart);

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() =>
          dispatch(
            createCart({
              merchandiseId: item.id,
              variantQuantity: item.quantity,
            })
          )
        }
      >
        Create Cart
      </button>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              merchandiseId: item.id,
              variantQuantity: item.quantity,
              cartId,
            })
          )
        }
      >
        Add to Cart
      </button>
      {products.map((product: any, index) => {
        const { id, quantity } = product.line.node;
        const { image } = product.line.node.merchandise;
        return (
          <>
            <div key={index}>
              <p>{quantity}</p>
              <Image
                src={image.url}
                alt={image.altText}
                width={80}
                height={80}
              />
            </div>
            <button
              onClick={() => {
                dispatch(
                  removeToCart({
                    cartId,
                    lineId: id,
                  })
                );
              }}
            >
              Remove to Cart
            </button>
          </>
        );
      })}
    </div>
  );
}
