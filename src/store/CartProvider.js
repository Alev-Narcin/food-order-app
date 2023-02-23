import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const upsatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;
        return {
            items: updatedItems,
            totalAmount: upsatedTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>


}

export default CartProvider;