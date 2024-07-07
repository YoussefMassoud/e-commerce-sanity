"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "../components/Card";

export interface FilterState {
  onSale: boolean;
  sizes: {
    large: boolean;
    medium: boolean;
    small: boolean;
  };
  price: {
    from: string;
    to: string;
  };
}

export default function Shop() {
  const [filter, setFilter] = useState<FilterState>({
    onSale: false,
    sizes: {
      large: false,
      medium: false,
      small: false,
    },
    price: {
      from: "",
      to: "",
    },
  });

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement> | FormEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { id, checked } = target;
    if (id === "onSale") {
      setFilter((prev) => ({ ...prev, onSale: checked }));
    } else if (id.startsWith("size-")) {
      const size = id.split("-")[1];
      setFilter((prev) => ({
        ...prev,
        sizes: { ...prev.sizes, [size]: checked },
      }));
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      price: { ...prev.price, [name]: value },
    }));
  };

  return (
    <>
      <div className="flex lg:mt-20 mt-8 flex-col justify-start gap-1 lg:px-12 px-4">
        <div className="flex flex-row gap-2">
          Home
          <p className="text-gray-400">/</p>
        </div>
        <h1 className="text-xl font-bold">Shop</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/** The filter menu */}
        <div className="hidden lg:col-span-1 col-span-full lg:px-12 px-4 lg:flex none flex-col">
          <div className="border-t flex flex-col justify-start mt-4 border-gray-200">
            <h1 className="text-lg font-bold mt-4">Filter by</h1>
            {/* Discounts section */}
            <div className="flex flex-col mt-2">
              <Label className="font-semibold">Discounts</Label>
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="onSale"
                  checked={filter.onSale}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="onSale" className="text-gray-400 px-2">
                  On Sale
                </Label>
              </div>
            </div>
            <div className="border-t-2 mt-4 border-gray-200"></div>
            {/* Size section */}
            <div className="flex flex-col mt-4">
              <Label className="font-semibold">Size</Label>
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="size-large"
                  checked={filter.sizes.large}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="size-large" className="text-gray-400 px-2">
                  Large
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="size-medium"
                  checked={filter.sizes.medium}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="size-medium" className="text-gray-400 px-2">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox
                  id="size-small"
                  checked={filter.sizes.small}
                  onChange={handleCheckboxChange}
                />
                <Label htmlFor="size-small" className="text-gray-400 px-2">
                  Small
                </Label>
              </div>
            </div>
            <div className="border-t-2 mt-4 border-gray-200"></div>
            {/* Price section */}
            <div className="flex flex-col mt-4">
              <Label>Price</Label>
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex flex-col space-y-2">
                  <Label className="font-semibold">From</Label>
                  <Input
                    placeholder="EGP 0"
                    name="from"
                    value={filter.price.from}
                    onChange={handlePriceChange}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label className="font-semibold">To</Label>
                  <Input
                    placeholder="EGP 0"
                    name="to"
                    value={filter.price.to}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/** The cards div */}
        <Card className="lg:col-span-3 col-span-4" filter={filter} />
      </div>
    </>
  );
}
