"use client";
import ImageGallery from "@/app/components/Product(components)/ImageGallery";
import MessageTelegram from "@/app/components/Product(components)/messageTelegram";
import Size from "@/app/components/Product(components)/Size";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cartContext";
import { cartProduct, fullProduct, sizeState } from "@/types/interface";
import { Landmark, Tag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ProductPageComponent = ({ data }: { data: fullProduct }) => {
  const [size, setSize] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const { addToCart, cart } = useCart();

  const router = useRouter();

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (parseInt(value) <= 1) return setCount(1);
    setCount(parseInt(value));
  };

  const handleAddToBagClick = () => {
    const newCartItem: cartProduct = {
      _id: data._id,
      count: count,
      imageUrl: data.images[0],
      name: data.name,
      price: data.price,
      sale: data.sale,
      size: size,
    };
    addToCart(newCartItem);
    router.replace("/shop");
  };

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
                  <Size size={size} setSize={setSize} />
                </div>
              </div>

              <div className="py-2 grid lg:flex lg:flex-row lg:space-x-8 lg:grid-cols-2">
                <div className="flex space-x-2 items-center mb-2 lg:mb-0">
                  <Input
                    type="number"
                    typeof="number"
                    placeholder="1"
                    value={count}
                    className="max-w-20 border-2 border-black"
                    onChange={(e) => handleCountChange(e)}
                  />
                  <MessageTelegram
                    productName={data.name}
                    productImage={data.images}
                    productPrice={data.price}
                  />
                </div>
                <div className="w-full">
                  <Button onClick={handleAddToBagClick} className="w-full">
                    Add to shopping bag
                  </Button>
                </div>
              </div>

              <div className="mt-4 mb-6 justify-center flex items-center gap-2    border-t  border-gray-400 ">
                <span className="text-md justify-between w-full lg:px-20 px-2 py-4 flex text-gray-600">
                  <span className="flex justify-center mt-5">
                    <Truck className="w-6 h-6 " />
                  </span>
                  <span className="flex flex-col">
                    Shipping fees calculated at checkout
                    <span className="text-gray-400">
                      Estimated delivery within 2–4 working days.
                    </span>
                  </span>
                </span>
              </div>

              <div className=" mb-6 flex justify-center items-center gap-2 border-b   border-t  border-gray-400 ">
                <span className="text-md w-full justify-between items-center px-3 lg:px-20 flex text-gray-600 py-5">
                  <span className="flex">
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default ProductPageComponent;
