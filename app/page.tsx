import React from "react";
import Landing from "@app/views/Landing";
import "../styles/styles.scss";
import { getAllProducts } from "@actions/product/getAllProducts";
import Listings from "@app/views/Listings";

async function Page() {
  const data = await getAllProducts();
  return (
    <>
      <Landing />
      <Listings data={data} />
    </>
  );
}

export default Page;
