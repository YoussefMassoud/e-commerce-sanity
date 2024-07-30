/* eslint-disable @next/next/no-img-element */
import { urlFor } from "@/lib/sanity";
import { fullProduct } from "@/types/interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SamllCardProps {
  product: fullProduct;
}

export const revlidate = 10; 

const SmallCard = ({ product }: SamllCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-2 group-hover:opacity-75 lg:h-80">
        <Link href={`/product/${product.slug}`} legacyBehavior>
          <Image
            src={product.imageUrl}
            alt="Product image"
            className="w-full h-full object-cover object-center lg:h-full lg:w-full"
            width={300}
            height={300}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between flex-col text-m font-bold text-gray-600">
        <Link href={`/product/${product.slug}`} legacyBehavior>
          {product.name}
        </Link>
        <h1 className="text-black font-normal text-[14px]">3 sizes</h1>
        {!product.sale?.on ? (
          <h1 className="text-black font-normal text-[14px] ">
            EGP{" "}
            <span className="font-semibold text-[16px]">{product.price}</span>
          </h1>
        ) : (
          <>
            <h1 className="text-black font-normal text-[14px] ">
              EGP{" "}
              <span className="font-semibold text-[16px]">
                {product.sale.to}
              </span>
            </h1>
            <h1 className="text-[14px] font-normal text-black">
              <span className="text-gray-400 line-through">
                EGP {product.sale.from}
              </span>{" "}
              -{product.sale.saved}%
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default SmallCard;
