import { createContext, useEffect, useState } from "react";

import { API_URL } from "../constants";

export const ProductsContext = createContext({
  products: [],
  orders: [],
  addOrder: () => {},
});

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const products = await response.json();
      setProducts(products);
    }

    loadProducts();
  }, []);

  async function addOrder(data) {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add new order.");
    }

    const savedOrder = await response.json();

    setOrders((prevOrders) => [savedOrder, ...prevOrders]);
  }

  const contextValue = {
    products,
    orders,
    addOrder,
  };

  return <ProductsContext value={contextValue}>{children}</ProductsContext>;
}
