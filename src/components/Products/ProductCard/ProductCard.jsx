import { use } from "react";

import ShoppingCartContext from "../../../store/shopping-cart-context";

import { Button } from "../../UI/Button";

import { API_URL } from "../../../constants";
import { currencyFormatter } from "../../../utils/currencyFormatter";

import cls from "./ProductCard.module.css";

export const ProductCard = ({ product }) => {
  const { addItemToCart } = use(ShoppingCartContext);

  const handleAddItemToCart = () => {
    addItemToCart(product);
  };

  return (
    <article className={cls.productCard}>
      <img
        src={`${API_URL}/${product.image}`}
        alt={product.name}
        className={cls.img}
      />
      <div>
        <h3 className={cls.title}>{product.name}</h3>
        <p className={cls.price}>{currencyFormatter.format(product.price)}</p>
      </div>
      <Button onClick={handleAddItemToCart}>Add to Cart</Button>
    </article>
  );
};
