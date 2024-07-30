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
import SortMenu from "./SortMenu";
import SmallCard from "./SmallCard";

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
      console.log("🚀 ~ fetchData ~ data:", data);
      setDefaultProduct(data);
      setProducts(data);

      // Preload images
      const imagePromises = data.map((product) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = product.imageUrl;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(imagePromises);
      setLoading(false);
    }

    setLoading(true);
    fetchData();
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
          <SortMenu
            activeSort={activeSort}
            handleSortChange={handleSortChange}
          />
        </div>
        <div className="mt-6 lg:col-span-3 col-span-4 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {loading || products.length === 0 ? (
            <SkeletonLoading />
          ) : (
            products.map((product) => (
              <SmallCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
