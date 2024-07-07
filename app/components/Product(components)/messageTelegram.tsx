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

async function sendTelegramMessage(formData: any, productName: string) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  const message = `
    New Order Details:    
    Name: ${formData.name}
    Phone: ${formData.phone}
    Address: ${formData.address}
    Product Name: ${productName}
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
}

export default function TelegramDialog({
  productName,
  productImage,
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
      const success = await sendTelegramMessage(formData, productName);
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
                  type="tel"
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
            <div className="grid flex-col gap-4 py-4">
              <Card>
                <CardContent className="">
                  <img
                    src={productImage}
                    alt="productImage"
                    className="w-full h-full"
                  />
                  <p className="mt-2 text-lg font-semibold">{productName}</p>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            {step === 2 && (
              <Button type="button" onClick={handleBackToFirstStep}>
                Back
              </Button>
            )}
              <Button type="submit">
                {step === 1 ? "Next Step" : "Submit"}
              </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
