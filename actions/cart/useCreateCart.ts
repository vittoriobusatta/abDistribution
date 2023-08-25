import { storefrontClient } from "@app/libs/storefront";
import CREATE_CART_MUTATION from "@graphql/cart/create-cart.graphql";

export async function useCreateCart(merchandiseId: string, quantity: number) {
  try {
    const response = await storefrontClient.mutate({
      mutation: CREATE_CART_MUTATION,
      variables: {
        lines: [
          {
            merchandiseId,
            quantity,
          },
        ],
      },
    });
    
    return response.data?.cartCreate?.cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}
