"use clinet";

import ImageGallery from "@/app/components/Product(components)/ImageGallery";
import { fullProduct } from "@/app/interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/sanity";
import { Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
      }`;
  const data = await client.fetch(query);
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  return (
    <>
      <div className="bg-3">
        <div className="mx-auto py-8 max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <ImageGallery images={data.images} />

            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <h2 className="text-2xl font-bold text-1 lg:text-3xl">
                  {data.name}
                </h2>
              </div>

              {/* price section */}
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-1 md:text-2xl">
                  ${data.price}
                </span>
              </div>

              <div className="mt-4 mb-6 flex items-center gap-2 text-blue-500">
                <Truck className="w-6 h-6" />
                <span className="text-sm text-gray-900">24h Shipping</span>
              </div>

              <p className="mt-8 text-base text-gray-500 tracking-wide">
                {data.description}
              </p>
              <div className="py-10 px-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-black text-white hover:bg-black hover:text-gray-100"
                    >
                      Shop Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Ship To</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label  className="text-right">
                          Name
                        </Label>
                        <Input
                          className="col-span-3"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Phone</Label>
                        <Input type="number" className="col-span-3" placeholder="+201063647856" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Address</Label>
                        <Input  className="col-span-3" placeholder="Enter your address" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Next Step</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
