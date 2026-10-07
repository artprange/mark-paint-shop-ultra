
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
  company: string;
  category: string;
  shipping: boolean;
  featured: boolean;
  description: string;
};

export type SingleProduct = Omit<Product, 'image'> & {
  images: { url: string }[];
  stock: number;
  reviews: number;
  stars: number;
};

export type CartItem = {

  id: string

  productId: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;

  max: number;
};
