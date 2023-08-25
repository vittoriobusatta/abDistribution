import { getProductByHandle } from "@actions/product/getProductByHandle";

type CollectionPageProps = {
  params: {
    handle: string;
  };
};

const CollectionPage = async ({ params }: CollectionPageProps) => {
  if (!params) {
    return <div>Invalid collection ID</div>;
  }

  const product = await getProductByHandle(params.handle);

  const variant = product.variants.edges[0].node
  console.log(variant);

  return (
    <>
      <div>
        {product.productType}
        {product.title}
      </div>
    </>
  );
};

export default CollectionPage;
