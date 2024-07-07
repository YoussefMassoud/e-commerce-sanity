/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { Trash2 } from "lucide-react";

async function sendTelegramMessage(formData: any, productName: string ,productPrice:number) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  const message = `
    New Order Details:    
    Name: ${formData.name}
    Phone: ${formData.phone}
    Address: ${formData.address}
    Product Name: ${productName}
    product Price: ${productPrice}
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

interface TelegramDialogProps {
  productName: string;
  productImage: string;
  productPrice: number;
}

export default function TelegramDialog({
  productName,
  productImage,
  productPrice,

}: TelegramDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      const success = await sendTelegramMessage(formData, productName, productPrice);
      if (success) {
        setFormData({ name: "", phone: "", address: "" });
        router.push("/success");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleBackToFirstStep = () => {
    setStep(1); // Go back to the first step (basic details)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white ">Shop Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ship To</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          {step === 1 && (
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
          )}
          {step === 2 && (
            <div className="grid flex-col gap-4  py-10">
              <Card>
                <CardContent className="flex py-2 flex-col justify-start">
                  <div className="flex flex-row justify-between items-center">
                    <img
                      src={urlFor(productImage[0]).url()}
                      alt="productImage"
                      className="max-w-20 max-h-20"
                    />
                    <div className="flex flex-col px-2 ">
                      <p className="text-lg py-2 font-semibold">{productName}</p>
                      <p className="text-lg py-2 font-semibold">Size: M</p>
                    </div>
                    <div className="flex flex-col justify-end py-2 mt-4 items-end">
                      <h1><p className="text-lg font-semibold"> EGP{productPrice}</p></h1>
                      
                      <div className="flex items-center space-x-2 mt-2">
                       
                        <div className="flex items-center py-2">
                           <button className="text-red-500"><Trash2  /></button>
                          <span className="px-2">1</span>
                          <button className="px-2 py-1 border rounded">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <button className="text-black font-semibold">+ Add other products</button>
              </div>
            </div>
          )}
          <DialogFooter>
            {step === 2 && (
              <Button type="button" onClick={handleBackToFirstStep}>
                Back
              </Button>
            )}
            <Button type="submit">{step === 1 ? "Next Step" : "Submit"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
