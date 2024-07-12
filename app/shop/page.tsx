/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "../components/Card";
import FilterMenu from "../components/FilterMenu";
import Footer from "../components/Footer";
import SkeletonLoading from "../components/SkeletonLoading";

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

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (id: string, checked: boolean) => {
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

  const handlePriceChange = () => {
    let fromValue = fromRef.current?.value || "";
    let toValue = toRef.current?.value || "";

    // Strip non-numeric characters from input
    fromValue = fromValue.replace(/\D/g, "");
    toValue = toValue.replace(/\D/g, "");

    setFilter((prev) => ({
      ...prev,
      price: { from: fromValue, to: toValue },
    }));
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  useEffect(() => {
    if (isFilterMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterMenuOpen]);

  //  loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // data fetch
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      <div className="">
        <div className="flex lg:mt-20 mt-8 flex-col justify-start gap-1 lg:px-12 px-4">
          <div className="flex justify-between">
            <div className="flex flex-row gap-2">
              Home
              <p className="text-gray-400">/</p>
            </div>
            {/** The filter button */}
            <button
              className="flex items-center gap-2 lg:hidden"
              onClick={toggleFilterMenu}
            >
              Filter by
              <img src="/filtermenu.svg" alt="filtermenu" />
            </button>
          </div>
          <h1 className="text-xl font-bold">Shop</h1>
        </div>

        <div className="grid grid-cols-4 w-full gap-4">
          {/** The filter menu */}

          <FilterMenu
            filter={filter}
            isOpen={isFilterMenuOpen}
            onClose={toggleFilterMenu}
            onCheckboxChange={handleCheckboxChange}
            onPriceChange={handlePriceChange}
            fromRef={fromRef}
            toRef={toRef}
          />

          {/** The desktop filter menu */}
          <div className="hidden lg:flex lg:col-span-1 flex-col lg:px-12 px-4 mt-8 lg:mt-0">
            <div className="border-t flex flex-col justify-start mt-4 border-gray-200">
              <h1 className="text-lg font-bold mt-4">Filter by</h1>
              {/* Discounts section */}
              <div className="flex flex-col mt-2">
                <Label className="font-semibold">Discounts</Label>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="onSale"
                    checked={filter.onSale}
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange("onSale", checked)
                    }
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
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange("size-large", checked)
                    }
                  />
                  <Label htmlFor="size-large" className="text-gray-400 px-2">
                    Large
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="size-medium"
                    checked={filter.sizes.medium}
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange("size-medium", checked)
                    }
                  />
                  <Label htmlFor="size-medium" className="text-gray-400 px-2">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="size-small"
                    checked={filter.sizes.small}
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange("size-small", checked)
                    }
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
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label className="font-semibold">To</Label>
                    <Input
                      ref={toRef}
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
          <div className="lg:col-span-3 lg:-mt-16 mt-6 col-span-4">
            {loading ? (
              <SkeletonLoading />
            ) : (
              <Card className="lg:col-span-3 col-span-4" filter={filter} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
