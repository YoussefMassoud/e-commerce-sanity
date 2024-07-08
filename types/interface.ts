export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  name: string;
}

export interface cartProduct {
  _id: string;
  imageUrl: string;
  price: number;
  size: string;
  count: number;
  name: string;
  sale: {
    on: boolean;
    to: string;
    from: string;
    saved: string;
  } | null;
}

export interface fullProduct {
  _id: string;
  images: any;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  sale: {
    on: boolean;
    to: string;
    from: string;
    saved: string;
  } | null;
  date: string;
}

export interface sizeState {
  large: boolean;
  small: boolean;
  medium: boolean;
}
