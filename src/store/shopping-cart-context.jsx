import { createContext, useReducer } from "react";
import { storage } from "../utils/storage";

export const ShoppingCartContext = createContext({
  items: storage.getItem("items") || [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
});

function shoppingCartReducer(state, action) {
  const product = action.payload;

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
        ...product,
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
    const { productId, amount } = action.payload;

    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === productId
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

  function handleAddItemToCart(product) {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: product });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  }

  function handleClearCart() {
    shoppingCartDispatch({
      type: "CLEAR_CART",
    });
  }

  const contextValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearCart,
  };

  return (
    <ShoppingCartContext value={contextValue}>{children}</ShoppingCartContext>
  );
}
