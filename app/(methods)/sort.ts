import { fullProduct } from "@/types/interface";

export function sort(arr: fullProduct[], keyword: string , defaultArr: fullProduct[]): fullProduct[] {
  if (keyword === "Recommended") return defaultArr;

  const sortedArray = [...arr]; // Create a copy of the array to sort

  const getEffectivePrice = (product: fullProduct) => {
    return product.sale && product.sale.on
      ? parseFloat(product.sale.to)
      : product.price;
  };

  if (keyword === "Newest") {
    sortedArray.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (keyword === "Price, low to high") {
    sortedArray.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
  } else if (keyword === "Price, high to low") {
    sortedArray.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
  }

  return sortedArray;
}
