import getCollectionById from "../../../actions/getCollectionById";

interface IParams {
  collectionId?: string;
}

const CollectionPage = async ({ params }: { params: IParams }) => {
  const collection = await getCollectionById(params);
  console.log(collection);

  if (!collection) {
    return <div>Loading...</div>;
  }

  return <></>;
};

export default CollectionPage;
