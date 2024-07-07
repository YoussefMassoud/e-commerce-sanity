export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  sale: {
    on: boolean;
    to: string;
    from: string;
    saved: string;
  } | null;
  date: string;
}

export interface fullProduct {
  _id: string;
  images: any;
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
}
