"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainLoading from "./MainLoading";

interface HeroProps {
  data: {
    image1: string; // Assuming image1 is a string URL
    // Add other properties from your fetched data as needed
  } | null; // data can be null initially
}

export default function Hero() {
  const [data, setData] = useState<HeroProps["data"]>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = "*[_type == 'heroImage'][0]";
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null); // Handle error state or fallback data accordingly
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <MainLoading />;
  }

  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <img
          src={urlFor(data.image1).url()}
          alt="Background"
          className="lg:h-full lg:w-full sm:w-fit sm:h-full w-fit h-full  object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center text-white space-y-5">
          <h1 className="mb-4 z-10 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-200 xl:text-lg mx-auto">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
          <div className="py-2">
            <Link href={"/shop"}>
              <Button className="bg-black text-white hover:bg-black px-8 ">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
