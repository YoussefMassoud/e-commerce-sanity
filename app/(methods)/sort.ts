import { fullProduct } from "@/types/interface";

export function sort(arr: fullProduct[], keyword: string): fullProduct[] {
  if (keyword === "Recommended") return arr;

  const sortedArray = [...arr]; // Create a copy of the array to sort

  if (keyword === "Newest") {
    sortedArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (keyword === "Price, low to high") {
    sortedArray.sort((a, b) => a.price - b.price);
  } else if (keyword === "Price, high to low") {
    sortedArray.sort((a, b) => b.price - a.price);
  }

  return sortedArray;
}
