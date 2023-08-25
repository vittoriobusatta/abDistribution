import { storefrontClient } from "@app/libs/storefront";
import UPDATE_CART_MUTATION from "@graphql/cart/update-cart.graphql";

export async function updateCart(
  cartId: string,
  lineId: string,
  quantity: number
) {
  try {
    const response = await storefrontClient.mutate({
      mutation: UPDATE_CART_MUTATION,
      variables: {
        cartId,
        lines: [
          {
            quantity,
            lineId,
          },
        ],
      },
    });

    return response.data?.cartLinesUpdate?.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}
