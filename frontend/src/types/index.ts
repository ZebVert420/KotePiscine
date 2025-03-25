export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: number | string;
  inStock: boolean;
  rating?: number;
  numReviews?: number;
  images: string[];
} 