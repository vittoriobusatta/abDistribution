"use client";
import Card from "../components/Card";

export default function Listings({ data }) {
  
  return (
    <>
      <section>
        {data.map((item: any, index: number) => (
          <Card key={index} item={item} />
        ))}
      </section>
    </>
  );
}
