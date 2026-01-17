import { ReactNode } from "react";

 type FiltersProps = {
	text: string;
	company: string;
	category: string;
	color: string;
	min_price: number;
	max_price: number;
	price: number;
	shipping: boolean;
};

 type Product = {
	id: string;
	name: string;
	price: number;
	colors: string[];
	category: string;
	company: string;
	shipping: boolean;
	// adiciona mais campos depois se quiser
};

 type FilterState = {
	filtered_products: Product[];
	all_products: Product[];
	grid_view: boolean;
	sort: string;
	filters: FiltersProps;
};

 type FilterContextType = FilterState & {
	setGridView: () => void;
	setListView: () => void;
	updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	updateFilters: (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
			| React.MouseEvent<HTMLButtonElement>
	) => void;
	clearFilters: () => void;
};

 type FilterProviderProps = {
	children: ReactNode;
};
type ProductsProviderProps = {
	children: ReactNode
}


export type { FilterProviderProps, FilterContextType, FilterState, Product, FiltersProps, ProductsProviderProps }