"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";

async function getData(): Promise<simplifiedProduct[]> {
  const query = `*[_type == "product"][0...50] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url,
        price
      }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

export default function Hero() {
  const [products, setProducts] = useState<simplifiedProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-3">
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8">
        {/* Round Products Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-3">Product</h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-2 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`} legacyBehavior>
                  <a>
                    <img
                      src={product.imageUrl}
                      alt="Product image"
                      className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                      width={300}
                      height={300}
                      loading="lazy"
                    />
                  </a>
                </Link>
              </div>
              <div className="mt-4 flex justify-between text-m font-bold text-gray-600">
                <Link href={`/product/${product.slug}`} legacyBehavior>
                  <a>{product.name}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
