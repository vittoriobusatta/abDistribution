import { storefrontClient } from "@app/libs/storefront";
import CREATE_CART_MUTATION from "@graphql/cart/create-cart.graphql";
import { CreateCartItem } from "@typage/cart";

export async function useCreateCart({
  merchandiseId,
  quantity,
}): Promise<CreateCartItem> {
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
    return err;
  }
}
