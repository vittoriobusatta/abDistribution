"use client";
import Image from "next/image";
import React from "react";
import { Product } from "../../types";
import { useRouter } from "next/navigation";


function Card({ item }: any) {
  const router = useRouter();
  return (
    <>
      <div key={item.id} onClick={() => router.push(`/product/${item.id}`)}>
        {/* <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={150}
          priority
        /> */}
      </div>
    </>
  );
}

export default Card;
