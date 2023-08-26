import { getProductByHandle } from "@actions/product/getProductByHandle";
import Counter from "@app/components/Counter";
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

  const variant = product.variants.edges[0].node;
  console.log(variant);

  return (
    <>
      <div>
        <Counter product={product} />
      </div>
    </>
  );
};

export default CollectionPage;
