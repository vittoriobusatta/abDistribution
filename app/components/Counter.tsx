"use client";

import { addToCart } from "@actions/cart/addToCart";
import { createCart } from "@actions/cart/createCart";
import { removeToCart } from "@actions/cart/removeToCart";

const item = {
  cart_id: "gid://shopify/Cart/c1-907adf1103af952e1e146bb668f7afde",
  line_id:
    "gid://shopify/CartLine/34b64cb8-332d-4abc-a0dc-aaeb3eb6fca7?cart=c1-907adf1103af952e1e146bb668f7afde",
  id: "gid://shopify/ProductVariant/46769462346001",
  quantity: 2,
};

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={async () => {
          const res = await createCart(item.id, item.quantity);
          console.log(res);
        }}
      >
        Create Cart
      </button>
      <button
        onClick={async () => {
          const res = await addToCart(item.cart_id, item.id, item.quantity);
          console.log(res);
        }}
      >
        add to cart
      </button>
      <button
        onClick={async () => {
          const res = await removeToCart(item.cart_id, item.line_id);
          console.log(res);
        }}
      >
        remove to cart
      </button>
    </div>
  );
}
