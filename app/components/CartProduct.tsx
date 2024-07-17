/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cartContext";
import { Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { findIndex } from "sanity";

async function sendTelegramMessage(formData: any, cart: any[]) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  const message = `
    New Order Details:🛵    
    Name: ${formData.name}
    Phone: ${formData.phone}
    Address: ${formData.address}
     Products: 
  ${cart.map((item, index) => `${index + 1}. Name : ${item.name} - Price : ${item.price}`).join("\n")}
  `;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log("Message sent to Telegram successfully");
      return true;
    } else {
      console.error("Failed to send message to Telegram");
      return false;
    }
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return false;
  }
}

interface cartProductProps {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CartProduct({
  cartOpen,
  setCartOpen,
}: cartProductProps) {
  const { cart, updateProductCount, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const success = await sendTelegramMessage(formData, cart);
    if (success) {
      setFormData({ name: "", phone: "", address: "" });
      router.push("/success");
      toast.success(" Your Order Request Done!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => {
              setCartOpen(false);
            }}
            className="space-x-4 rounded-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <h1 className="text-white text-[14px] font-normal">
              {cart.length}
            </h1>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-fit lg:w-[100000px] overflow-y-auto "
        >
          <div className="pb-10">
            <SheetHeader className="font-bold text-xl">
              Your shopping bag
            </SheetHeader>
            <SheetDescription>From Allure_eg</SheetDescription>
          </div>
          <Card>
            <CardHeader className="flex justify-start gap-5   ">
              <div className="font-semibold">Products</div>

              {cart.length === 0 ? (
                <div className="flex flex-col justify-center items-center  gap-4">
                  <ShoppingBag className="w-7 h-7" />
                  <h1 className="font-semibold text-sm text-gray-500">
                    Your cart is empty
                  </h1>
                  <div className=" flex justify-center">
                    <Link href={"/shop"}>
                      <Button
                        onClick={() => {
                          setCartOpen(false);
                        }}
                        className=""
                      >
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
                            <p className="lg:text-lg text-sm py-2 lg:font-semibold">
                              {item.name}
                            </p>
                            <p className="lg:text-lg  text-sm lg:font-semibold">
                              Size: {item.size}
                            </p>
                          </div>
                          <div className="flex flex-col justify-end py-2 mt-4 items-end">
                            <h1>
                              <p className="text-sm font-semibold">
                                EGP{item.price}
                              </p>
                            </h1>

                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center py-2">
                                <button
                                  onClick={() => {
                                    const index = cart.findIndex(
                                      (product) =>
                                        product._id === item._id &&
                                        product.size === item.size
                                    );
                                    if (index !== -1) {
                                      if (item.count > 1) {
                                        updateProductCount(index, --item.count);
                                      } else {
                                        removeFromCart(index);
                                      }
                                    }
                                  }}
                                  className={
                                    item.count <= 1
                                      ? `text-red-500`
                                      : "text-black"
                                  }
                                >
                                  {item.count <= 1 ? <Trash2 /> : "-"}
                                </button>

                                <span className="px-2">{item.count}</span>
                                <button
                                  onClick={() => {
                                    const index = cart.findIndex(
                                      (product) =>
                                        product._id === item._id &&
                                        product.size === item.size
                                    );
                                    if (index !== -1) {
                                      updateProductCount(index, ++item.count);
                                    }
                                  }}
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
                      <button
                        onClick={() => {
                          setCartOpen(false);
                        }}
                        className="text-black font-semibold"
                      >
                        + Add other products
                      </button>
                    </div>
                  </Link>
                </div>
              )}
            </CardHeader>
          </Card>
          {/* Shipping Details */}
          <form onSubmit={handleFormSubmit}>
            <div className="py-6">
              <Card>
                <CardHeader className="flex justify-start gap-5">
                  <div className="font-semibold">Ship to</div>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Name</Label>
                      <Input
                        className="col-span-3"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Phone</Label>
                      <Input
                        type="number"
                        className="col-span-3"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+201063647856"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Address</Label>
                      <Input
                        className="col-span-3"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
            {/* Shipping Details end */}
            <div className="flex justify-center">
              {" "}
              <SheetFooter>
                <Button
                  type="submit"
                  className="flex justify-between items-center px-20"
                >
                  <div className="font-semibold text-base">Place Order</div>
                </Button>
              </SheetFooter>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
