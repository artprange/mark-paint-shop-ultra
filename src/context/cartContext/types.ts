export type CartItemProps = {
	id: string;
	name: string;
	color: string;
	amount: number;
	image: string;
	price: number;
	max: number;
};

export type CartState = {
	cart: CartItemProps[];
	total_items: number;
	total_amount: number;
	shipping_fee: number;
};

export type CartContextType = CartState & {
	addToCart: (
		id: string,
		color: string,
		amount: number,
		product: Product
	) => void;
	removeItem: (id: string) => void;
	toggleAmount: (id: string, value: "inc" | "dec") => void;
	clearCart: () => void;
};

export type Product = {
	id: string;
	name: string;
	images: { url: string }[];
	price: number;
	stock: number;
	colors: string[];

};
