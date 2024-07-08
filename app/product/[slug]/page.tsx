import ImageGallery from "@/app/components/Product(components)/ImageGallery";
import MessageTelegram from "@/app/components/Product(components)/messageTelegram";
import Size from "@/app/components/Product(components)/Size";
import { fullProduct } from "@/app/interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { client } from "@/lib/sanity";
import { Landmark, Tag, Truck } from "lucide-react";
import { ToastContainer } from "react-toastify";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
           sale,
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
              <div className="flex items-end flex-row gap-2">
                {!data.sale?.on ? (
                  <span className="text-xl font-bold text-1 md:text-2xl">
                    EGP {data.price}
                  </span>
                ) : (
                  <>
                    <span className="text-xl flex flex-row  font-bold text-1 md:text-2xl">
                      EGP {data.sale.to}
                    </span>
                    <h1 className="text-[14px] font-normal flex flex-row gap-6 text-black">
                      <span className="text-gray-400 line-through">
                        EGP {data.sale.from}
                      </span>
                      <div className="bg-gray-300 py-1 rounded-xl px-4 flex font-semibold items-center  text-black">
                        <Tag className="text-black w-4 h-4 mr-1 " /> Save -
                        {data.sale.saved}%
                      </div>
                    </h1>
                  </>
                )}
              </div>
              <div className="flex flex-col py-8">
                <Label className="text-md">Size</Label>
                <div className="flex flex-row gap-4 py-2 ">
                  <Size />
                </div>
              </div>

              <div className="py-2 flex flex-row space-x-8 ">
                <Input
                  type="number"
                  typeof="number"
                  placeholder="1"
                  className="max-w-20 "
                />
                <MessageTelegram
                  productName={data.name}
                  productImage={data.images}
                  productPrice={data.price}
                />
                <Button className="">Add to shopping bag</Button>
              </div>

              <div className="mt-4 mb-6 justify-center flex items-center gap-2 border-b   border-t  border-gray-400 ">
                <span className="text-md flex-col mb-5 flex text-gray-600">
                  <span className="flex justify-center mt-5">
                    <Truck className="w-6 h-6 " />
                  </span>
                  Shipping fees calculated at checkout
                  <span>Estimated delivery within 2–4 working days.</span>
                </span>
              </div>

              <div className="mt-4 mb-6 flex justify-center items-center gap-2 border-b   border-t  border-gray-400 ">
                <span className="text-md flex-col mb-5 flex text-gray-600">
                  <span className="flex justify-center mt-5">
                    <Landmark className="w-6 h-6 " />
                  </span>
                  Cash on delivery & online payments
                </span>
              </div>

              <p className="mt-8 text-base text-gray-500 tracking-wide">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
