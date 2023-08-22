import { storefrontClient } from "@app/libs/storefront";
import SINGLE_PRODUCT_QUERY from "@graphql/getSingleProduct.graphql";

export async function getProductByHandle(handle: string) {
  try {
    const response = await storefrontClient.query({
      query: SINGLE_PRODUCT_QUERY,
      variables: { handle },
    });

    return response.data?.productByHandle;
  } catch (err) {
    console.error(err);
    return null;
  }
}
