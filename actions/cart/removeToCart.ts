import { storefrontClient } from "@app/libs/storefront";
import REMOVE_CART_MUTATION from "@graphql/cart/remove-to-cart.graphql";

export async function removeToCart(cartId: string, lineId: string) {
  try {
    const response = await storefrontClient.mutate({
      mutation: REMOVE_CART_MUTATION,
      variables: {
        cartId,
        lineIds: [lineId],
      },
    });

    return response.data?.cartLinesRemove?.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}