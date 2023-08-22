import React from "react";
import Landing from "./components/Landing";
import "../styles/styles.scss";
import { getAllProducts } from "../actions/getAllProducts";
import Listings from "./components/Listings";

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
