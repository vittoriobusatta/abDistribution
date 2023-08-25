import { storefrontClient } from "@app/libs/storefront";
import ADD_TO_CART_MUTATION from "@graphql/cart/add-to-cart.graphql";

export async function useAddToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
) {
  try {
    const response = await storefrontClient.mutate({
      mutation: ADD_TO_CART_MUTATION,
      variables: {
        cartId,
        lines: [
          {
            quantity,
            merchandiseId,
          },
        ],
      },
    });

    return response.data?.cartLinesAdd?.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}