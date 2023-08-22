import React from "react";
import Landing from "./views/Landing";
import "../styles/styles.scss";
import { getAllProducts } from "../actions/getAllProducts";
import Listings from "./views/Listings";

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
