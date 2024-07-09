/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cartContext";
import { cartProduct } from "@/types/interface";
import { Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

export default function CartProduct() {
  const { cart, updateProductCount, removeFromCart } = useCart();
  const handleOpenChange = () => {};

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="space-x-4 rounded-lg">
            <ShoppingBag className="w-5 h-5" />
            <h1 className="text-white text-[14px] font-normal">
              {cart.length}
            </h1>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-fit lg:w-[100000px]  ">
          <div className="pb-10">
            <SheetHeader className="font-bold text-xl">
              Your shopping bag
            </SheetHeader>
            <SheetDescription>From Allure_eg</SheetDescription>
          </div>

          <Card>
            <CardHeader className="flex justify-start gap-5   ">
              Products
              {cart.length === 0 ? (
                <div className="flex flex-col justify-center items-center  gap-4">
                  <ShoppingBag className="w-7 h-7" />
                  <h1 className="font-semibold text-sm text-gray-500">
                    Your cart is empty
                  </h1>
                  <div className=" flex justify-center">
                    <Link href={"/shop"}>
                      <Button className="">
                        <Plus /> Add Product
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid flex-col gap-4  ">
                  {cart.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="flex py-2 flex-col justify-start">
                        <div className="flex flex-row justify-between items-center">
                          <img
                            src={urlFor(item.imageUrl).url()}
                            alt="productImage"
                            className="max-w-20 object-cover max-h-24 min-w-20"
                          />
                          <div className="flex flex-col px-2">
                            <p className="text-lg py-2 font-semibold">
                              {item.name}
                            </p>
                            <p className="text-lg py-2 font-semibold">
                              Size: {item.size}
                            </p>
                          </div>
                          <div className="flex flex-col justify-end py-2 mt-4 items-end">
                            <h1>
                              <p className="text-lg font-semibold">
                                EGP{item.price}
                              </p>
                            </h1>

                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center py-2">
                                <button
                                  onClick={() => removeFromCart(item._id)}
                                  className="text-red-500"
                                >
                                  <Trash2 />
                                </button>
                                <span className="px-2">{item.count}</span>
                                <button
                                  onClick={() =>
                                    updateProductCount(item._id, ++item.count)
                                  }
                                  className="px-2 py-1 border rounded"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Link href={"/shop"}>
                    <div className="mt-4">
                      <button className="text-black font-semibold">
                        + Add other products
                      </button>
                    </div>
                  </Link>
                </div>
              )}
            </CardHeader>
          </Card>
        </SheetContent>
      </Sheet>
    </>
  );
}
