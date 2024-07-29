/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { fullProduct } from "../../types/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterState } from "../shop/page";
import { sort } from "../(methods)/sort";
import { filterMethod } from "../(methods)/filter";
import SkeletonLoading from "./SkeletonLoading";
import { useSearch } from "@/context/searchContext";
import { searchMethod } from "../(methods)/search";

async function getData(): Promise<fullProduct[]> {
  const query = `*[_type == "product"][0...50] | order(_createdAt desc) {
        _id,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url,
        price,
        date,
        sale
      }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

export default function Card({
  className,
  filter,
}: {
  className: string;
  filter: FilterState;
}) {
  const [activeSort, setActiveSort] = useState("Recommended"); // State to track active sort option
  const [products, setProducts] = useState<fullProduct[]>([]);
  const [defaultProduct, setDefaultProduct] = useState<fullProduct[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { search } = useSearch();

  //
  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setDefaultProduct(data);
      setProducts(data);
    }
    setLoading(true);

    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    setProducts(sort(products, activeSort, defaultProduct));
  }, [activeSort]);

  useEffect(() => {
    const filteredProducts = filterMethod(products, filter, defaultProduct);
    setProducts(filteredProducts);
  }, [filter]);

  // The Search method useEffect
  useEffect(() => {
    searchMethod(defaultProduct, setProducts, search);
  }, [search]);

  // Function to handle sorting change
  const handleSortChange = (sortOption: string) => {
    setActiveSort(sortOption);
  };

  return (
    <div className={`${className}`}>
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 sm:pt-10 lg:max-w-7xl lg:px-8">
        {/* Round Products Section */}
        <div className="flex justify-between items-center">
          <h6 className="tracking-tight">{products.length} Product</h6>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-[">
              Sort by: {activeSort}{" "}
              <img src="/arrow.svg" alt="arrow" className="w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleSortChange("Recommended")}
                className={activeSort === "Recommended" ? "bg-gray-200" : ""}
              >
                Recommended
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("Newest")}
                className={activeSort === "Newest" ? "bg-gray-200" : ""}
              >
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("Price, low to high")}
                className={
                  activeSort === "Price, low to high" ? "bg-gray-200" : ""
                }
              >
                Price, low to high
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("Price, high to low")}
                className={
                  activeSort === "Price, high to low" ? "bg-gray-200" : ""
                }
              >
                Price, high to low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-6 lg:col-span-3 col-span-4 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {loading ? (
            <SkeletonLoading />
          ) : (
            products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-2 group-hover:opacity-75 lg:h-80">
                  <Link href={`/product/${product.slug}`} legacyBehavior>
                    <img
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
                  <h1 className="text-black font-normal text-[14px]">
                    3 sizes
                  </h1>
                  {!product.sale?.on ? (
                    <h1 className="text-black font-normal text-[14px] ">
                      EGP{" "}
                      <span className="font-semibold text-[16px]">
                        {product.price}
                      </span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
