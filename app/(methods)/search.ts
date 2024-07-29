import { fullProduct } from "@/types/interface";
import { Dispatch, SetStateAction } from "react";

export function searchMethod(
  defaultProduct: fullProduct[],
  setProducts: Dispatch<SetStateAction<fullProduct[]>>,
  searchValue: string | null
) {
  if (!searchValue) {
    return setProducts(defaultProduct);
  }

  const newArr = defaultProduct.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return setProducts(newArr);
}
