import axios from "axios";
import { Collection } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getAllCollections() {
  try {
    const allCollections = [] as Collection[];
    const response = await axios.get("http://localhost:3000/api/products", {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.data;
    for (const collectionKey in data) {
      const collection = data[collectionKey];
      allCollections.push(collection);
    }
    return allCollections;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
