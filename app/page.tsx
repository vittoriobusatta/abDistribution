import React from "react";
import Landing from "./views/Landing";
import "../styles/styles.scss";
import { getAllProducts } from "../actions/product/getAllProducts";
import Listings from "./views/Listings";
import Counter from "./components/Counter";

async function Page() {
  const data = await getAllProducts();
  return (
    <>
      <Landing />
      <Counter />
      {/* <Listings data={data} /> */}
    </>
  );
}

export default Page;
