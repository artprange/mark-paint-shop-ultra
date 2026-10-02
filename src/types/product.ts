/**
 * Shape devolvido pela listagem (`/products`): a Airtable entrega um array de
 * imagens, mas a function achata para a primeira url em `image`.
 */
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

/**
 * Shape devolvido por `/single-product?id=`: o registro completo, com todas as
 * imagens e os campos que a listagem não carrega.
 */
export type SingleProduct = Omit<Product, 'image'> & {
  images: { url: string }[];
  stock: number;
  reviews: number;
  stars: number;
};

export type CartItem = {
  /** `${productId}${color}` — o mesmo produto em cores diferentes vira linhas distintas. */
  id: string;
  name: string;
  color: string;
  amount: number;
  image: string;
  price: number;
  /** Teto de quantidade, vindo do `stock` do produto. */
  max: number;
};
