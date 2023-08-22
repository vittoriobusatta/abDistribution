"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

function Card({ item }: any) {
  const router = useRouter();

  const { node } = item.images.edges[0];
  const { altText, url } = node;

  return (
    <>
      <div key={item.id} onClick={() => router.push(`/product/${item.handle}`)}>
        <Image src={url} alt={altText} width={100} height={300} priority />
      </div>
    </>
  );
}

export default Card;
