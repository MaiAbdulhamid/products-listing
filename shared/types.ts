type RatingType = { rate: number; count: number };

export type ProductType = {
  category: string;
  description: string;
  id: string | number;
  image: string;
  price: number;
  rating: RatingType;
  title: string;
};
