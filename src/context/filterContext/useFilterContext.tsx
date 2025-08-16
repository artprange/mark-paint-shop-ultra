


import { FilterContextType, FilterProviderProps, FilterState } from "./types";
import { CLEAR_FILTERS, FILTER_PRODUCTS, LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, SORT_PRODUCTS, UPDATE_FILTERS, UPDATE_SORT } from "../../actions";
import { createContext, useContext, useEffect, useReducer } from "react";
import useProductsContext from '../products_context';


const initialState: FilterState = {
	filtered_products: [],
	all_products: [],
	grid_view: true,
	sort: "price-lowest",
	filters: {
		text: "",
		company: "all",
		category: "all",
		color: "all",
		min_price: 0,
		max_price: 0,
		price: 0,
		shipping: false,
	},
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);


export function FilterProvider({ children }: FilterProviderProps) {
	const { products } = useProductsContext();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [state.sort, state.filters]);

	const setGridView = () => dispatch({ type: SET_GRIDVIEW });
	const setListView = () => dispatch({ type: SET_LISTVIEW });

	const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	const updateFilters = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
			| React.MouseEvent<HTMLButtonElement>
	) => {
		let name = (e.target as HTMLInputElement).name;
		let value: string | number | boolean =
			(e.target as HTMLInputElement).value;

		if (name === "category") {
			value = (e.target as HTMLElement).textContent || "all";
		}
		if (name === "color") {
			value = (e.target as HTMLElement).getAttribute("data-color") || "all";
		}
		if (name === "price") {
			value = Number(value);
		}
		if (name === "shipping") {
			value = (e.target as HTMLInputElement).checked;
		}

		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const clearFilters = () => dispatch({ type: CLEAR_FILTERS });

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
				clearFilters,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
}

export const useFilterContext = (): FilterContextType => {
	const context = useContext(FilterContext);
	if (!context)
		throw new Error("useFilterContext must be used inside FilterProvider");
	return context;
};
