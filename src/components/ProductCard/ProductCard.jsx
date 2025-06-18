import { API_URL } from "../../constants";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { Button } from "../UI/Button";
import cls from "./ProductCard.module.css";

export const ProductCard = ({ product, onAddItemToCart }) => {
  const handleAddItemToCart = () => {
    onAddItemToCart(product);
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
