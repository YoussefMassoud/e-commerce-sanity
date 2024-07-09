import { fullProduct } from "@/types/interface";
import { FilterState } from "../shop/page";

export function filterMethod(
  arr: fullProduct[],
  filterObj: FilterState,
  defaultArr: fullProduct[]
): fullProduct[] {
  // Check if all filter criteria in filterObj are false
  const allFiltersFalse =
    !filterObj.onSale &&
    !filterObj.sizes.small &&
    !filterObj.sizes.medium &&
    !filterObj.sizes.large &&
    !filterObj.price.from &&
    !filterObj.price.to;

  // If all filters are false, return the default array
  if (allFiltersFalse) {
    return defaultArr;
  }

  // If arr is empty, apply filters to defaultArr
  if (arr.length === 0) {
    return defaultArr.filter((product) => {
      // Check if the product is on sale if filterObj.onSale is true
      if (filterObj.onSale && (!product.sale || !product.sale.on)) {
        return false;
      }

      // Check if any size filter is applied
      const sizeFilterApplied =
        filterObj.sizes.small ||
        filterObj.sizes.medium ||
        filterObj.sizes.large;

      // If size filter is applied and the product matches any size, keep the product
      if (sizeFilterApplied) {
        return true;
      }

      // Parse price.from and price.to only if they are valid number strings
      const priceFrom = filterObj.price.from
        ? parseFloat(filterObj.price.from)
        : null;
      const priceTo = filterObj.price.to
        ? parseFloat(filterObj.price.to)
        : null;

      // Determine the price to use for comparison
      const effectivePrice =
        product.sale && product.sale.on
          ? parseFloat(product.sale.to)
          : product.price;

      // Filter based on price range if either from or to values are provided
      const priceInRange =
        (priceFrom === null || effectivePrice >= priceFrom) &&
        (priceTo === null || effectivePrice <= priceTo);

      // If the product does not meet the price criteria, exclude it
      if (!priceInRange) {
        return false;
      }

      // If all criteria are met, include the product
      return true;
    });
  }

  // Apply filters to arr
  return arr.filter((product) => {
    // Check if the product is on sale if filterObj.onSale is true
    if (filterObj.onSale && (!product.sale || !product.sale.on)) {
      return false;
    }

    // Check if any size filter is applied
    const sizeFilterApplied =
      filterObj.sizes.small || filterObj.sizes.medium || filterObj.sizes.large;

    // If size filter is applied and the product matches any size, keep the product
    if (sizeFilterApplied) {
      return true;
    }

    // Parse price.from and price.to only if they are valid number strings
    const priceFrom = filterObj.price.from
      ? parseFloat(filterObj.price.from)
      : null;
    const priceTo = filterObj.price.to ? parseFloat(filterObj.price.to) : null;

    // Determine the price to use for comparison
    const effectivePrice =
      product.sale && product.sale.on
        ? parseFloat(product.sale.to)
        : product.price;

    // Filter based on price range if either from or to values are provided
    const priceInRange =
      (priceFrom === null || effectivePrice >= priceFrom) &&
      (priceTo === null || effectivePrice <= priceTo);

    // If the product does not meet the price criteria, exclude it
    if (!priceInRange) {
      return false;
    }

    // If all criteria are met, include the product
    return true;
  });
}
