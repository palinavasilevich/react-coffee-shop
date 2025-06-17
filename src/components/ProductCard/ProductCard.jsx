import { API_URL } from "../../constants";
import { Button } from "../UI/Button";
import cls from "./ProductCard.module.css";

export const ProductCard = ({ product, onAddItemToCart }) => {
  const handleAddItemToCart = () => {
    onAddItemToCart(product);
  };

  return (
    <div className={cls.productCard}>
      <img
        src={`${API_URL}/${product.image}`}
        alt={product.name}
        className={cls.img}
      />
      <p className={cls.title}>{product.name}</p>
      <span className={cls.price}>€{product.price}</span>
      <Button onClick={handleAddItemToCart}>Add to Cart</Button>
    </div>
  );
};
