import Image from "next/image";
import React from "react";
import { Product } from "../../types";

type Props = {
  item: Product;
};

function Card({ item }: Props) {
  return (
    <>
      <div key={item.id}>
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={150}
          priority
        />
      </div>
    </>
  );
}

export default Card;
