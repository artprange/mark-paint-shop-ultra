import {
	useEffect,
	useContext,
	useReducer,
	createContext,
	ReactNode,
} from "react";
import reducer from "../reducers/filter_reducer";
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import { FilterContextType, FilterProviderProps, FilterState } from "./types";

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
