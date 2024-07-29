/* eslint-disable @next/next/no-img-element */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface sortMenuProps {
  handleSortChange: (sortOption: string) => void;
  activeSort: string;
}

const SortMenu = ({ handleSortChange, activeSort }: sortMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-[">
        Sort by: {activeSort}{" "}
        <img src="/arrow.svg" alt="arrow" className="w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => handleSortChange("Recommended")}
          className={activeSort === "Recommended" ? "bg-gray-200" : ""}
        >
          Recommended
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("Newest")}
          className={activeSort === "Newest" ? "bg-gray-200" : ""}
        >
          Newest
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("Price, low to high")}
          className={activeSort === "Price, low to high" ? "bg-gray-200" : ""}
        >
          Price, low to high
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleSortChange("Price, high to low")}
          className={activeSort === "Price, high to low" ? "bg-gray-200" : ""}
        >
          Price, high to low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortMenu;
