import axios from "axios";

interface Params {
  collectionId?: string;
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default async function getCollectionById(params: Params) {
  try {
    const { collectionId } = params;
    const response = await axios.get(
      `http://localhost:3000/api/collection/${collectionId}`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
