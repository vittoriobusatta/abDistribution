import { getProductByHandle } from "@actions/getProductByHandle";

type CollectionPageProps = {
  params: {
    handle: string;
  };
};

const CollectionPage = async ({ params }: CollectionPageProps) => {
  if (!params) {
    return <div>Invalid collection ID</div>;
  }
  console.log(params.handle);

  const product = await getProductByHandle(params.handle);
  console.log(product);

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
