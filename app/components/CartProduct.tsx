/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";

export default function CartProduct() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="space-x-4 rounded-lg">
            <ShoppingBag className="w-5 h-5" />
            <h1 className="text-white text-[14px] font-normal">{"0"}</h1>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="font-bold text-xl">
            Your shopping bag
          </SheetHeader>
          <SheetDescription>From Allure_eg</SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}
