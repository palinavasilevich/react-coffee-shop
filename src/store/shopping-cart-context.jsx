import { createContext, useReducer } from "react";
import { storage } from "../utils/storage";

const ShoppingCartContext = createContext({
  items: storage.getItem("items") || [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.payload,
        quantity: 1,
      });
    }

    storage.setItem("items", updatedItems);

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const { itemId, amount } = action.payload;

    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === itemId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    storage.setItem("items", updatedItems);

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    storage.removeItem("items");

    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export function ShoppingCartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: storage.getItem("items") || [],
    }
  );

  function handleAddItemToCart(item) {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: item });
  }

  function handleUpdateCartItemQuantity(itemId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { itemId, amount },
    });
  }

  function handleClearCart() {
    shoppingCartDispatch({
      type: "CLEAR_CART",
    });
  }

  const shoppingCartContext = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearCart,
  };

  return (
    <ShoppingCartContext value={shoppingCartContext}>
      {children}
    </ShoppingCartContext>
  );
}

export default ShoppingCartContext;
