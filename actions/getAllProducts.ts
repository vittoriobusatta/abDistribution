import axios from "axios";
import { Product } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getAllProducts() {
  try {
    const allProducts = [] as Product[];
    const response = await axios.get("http://localhost:3000/api/products", {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.data;
    for (const collectionKey in data) {
      const collection = data[collectionKey];
      for (const productKey in collection) {
        const product = collection[productKey].products;
        for (const key in product) {
          const item = product[key];
          allProducts.push(item);
        }
      }
    }
    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
