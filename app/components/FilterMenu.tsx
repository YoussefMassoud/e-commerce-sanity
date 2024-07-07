/* eslint-disable @next/next/no-img-element */
// FilterMenu.tsx

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterState } from "../shop/page";

interface Props {
  filter: FilterState;
  isOpen: boolean;
  onClose: () => void;
  onCheckboxChange: (
    id: string,
    checked: React.FormEvent<HTMLButtonElement>
  ) => void;
  onPriceChange: () => void;
  fromRef: React.RefObject<HTMLInputElement>;
  toRef: React.RefObject<HTMLInputElement>;
}

const FilterMenu: React.FC<Props> = ({
  filter,
  isOpen,
  onClose,
  onCheckboxChange,
  onPriceChange,
  fromRef,
  toRef,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bg-black bg-opacity-20 w-full h-full z-[100] lg:hidden">
      <div className="bg-white h-full w-2/4 z-[10] col-span-full px-4 flex flex-col relative">
        {/* Close button for small screens */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <img src="/close-icon.svg" alt="Close" />
        </button>
        <div className=" flex flex-col justify-start mt-">
          <h1 className="text-lg font-bold mt-4">Filter by</h1>
          {/* Discounts section */}
          <div className="flex flex-col mt-2">
            <Label className="font-semibold">Discounts</Label>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="onSale"
                checked={filter.onSale}
                onChange={(checked) => onCheckboxChange("onSale", checked)}
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
                onChange={(checked) => {
                  console.log("🚀 ~ Shop ~ checked:", checked);

                  onCheckboxChange("size-large", checked);
                }}
              />
              <Label htmlFor="size-large" className="text-gray-400 px-2">
                Large
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="size-medium"
                checked={filter.sizes.medium}
                onChange={(checked) => onCheckboxChange("size-medium", checked)}
              />
              <Label htmlFor="size-medium" className="text-gray-400 px-2">
                Medium
              </Label>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                id="size-small"
                checked={filter.sizes.small}
                onChange={(checked) => onCheckboxChange("size-small", checked)}
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
                  ref={fromRef}
                  placeholder="EGP 0"
                  name="from"
                  value={filter.price.from}
                  onChange={onPriceChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label className="font-semibold">To</Label>
                <Input
                  ref={toRef}
                  placeholder="EGP 0"
                  name="to"
                  value={filter.price.to}
                  onChange={onPriceChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
