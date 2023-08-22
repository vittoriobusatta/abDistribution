"use client";
import Card from "./Card";
import { Product } from "../../types";

export default function Listings({ data }) {
  return (
    <>
      <section>
        {data.map((item: Product, index: number) => (
          <Card key={index} item={item} />
        ))}
      </section>
    </>
  );
}
