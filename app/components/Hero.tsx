/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  const data = await client.fetch(query);

  return data;
}

export default async function Hero() {
  const data = await getData();
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <img
          src={urlFor(data.image1).url()}
          alt="Background"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-10  flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center text-white space-y-5">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
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
