import { createContext, useContext, useEffect, useReducer } from 'react'
import reducer, {
  initialFilterState,
  type SortOption,
} from '../../reducers/filter_reducer'
import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from '../../actions'
import type { FilterContextType, FilterProviderProps } from './types'

const FilterContext = createContext<FilterContextType | undefined>(undefined)


export function FilterProvider({ children, products }: FilterProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialFilterState);

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
		dispatch({ type: UPDATE_SORT, payload: value as SortOption });
	};

	const updateFilters = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
			| React.MouseEvent<HTMLButtonElement>
	) => {
		// currentTarget, não target: num clique no <svg> do check dentro do
		// botão de cor, target é o svg e o data-color volta nulo.
		const element = e.currentTarget as HTMLInputElement
		const name = element.name
		let value: string | number | boolean = element.value

		if (name === "category") {
			value = element.textContent?.trim() || "all"
		}
		if (name === "color") {
			value = element.getAttribute("data-color") || "all"
		}
		if (name === "price") {
			value = Number(value)
		}
		if (name === "shipping") {
			value = element.checked
		}

		dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
	}

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
