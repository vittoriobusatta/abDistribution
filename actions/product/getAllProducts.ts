import { storefrontClient } from "@app/libs/storefront";
import ALL_PRODUCTS_QUERY from "@graphql/product/get-all-products.graphql";

export async function getAllProducts() {
  try {
    const response = await storefrontClient.query({
      query: ALL_PRODUCTS_QUERY,
    });

    return response.data?.products?.edges?.map((edge: any) => edge.node);
  } catch (err) {
    console.error(err);
    return [];
  }
}
