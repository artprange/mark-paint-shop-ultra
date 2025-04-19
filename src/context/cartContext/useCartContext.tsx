import {
	useEffect,
	useContext,
	useReducer,
	createContext,
	ReactNode,
} from "react";
import reducer from "../reducers/cart_reducer";
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
	CLEAR_CART,
	COUNT_CART_TOTALS,
} from "../actions";

import { CartContextType, CartState, Product } from "./types";
import { CartItemProps } from "./types";

const getLocalStorage = (): CartItemProps[] => {
	const cart = localStorage.getItem("cart");
	return cart ? JSON.parse(cart) : [];
};

const initialState: CartState = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 534,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
	children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addToCart = (
		id: string,
		color: string,
		amount: number,
		product: Product
	) => {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	};

	const removeItem = (id: string) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: id });
	};

	const toggleAmount = (id: string, value: "inc" | "dec") => {
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
	};

	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart));
		dispatch({ type: COUNT_CART_TOTALS });
	}, [state.cart]);

	return (
		<CartContext.Provider
			value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCartContext = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCartContext must be used inside CartProvider");
	return context;
};
