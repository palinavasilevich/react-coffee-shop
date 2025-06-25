import { use, useState } from "react";

import ShoppingCartContext from "../../../store/shopping-cart-context";

import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";

import { API_URL } from "../../../constants";
import { currencyFormatter } from "../../../utils/currencyFormatter";

import cls from "./ProductCard.module.css";
import UserProgressContext from "../../../store/user-progress-context";

export const ProductCard = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const { addItemToCart } = use(ShoppingCartContext);
  const { showCart } = use(UserProgressContext);

  const handleAddItemToCart = () => {
    addItemToCart(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGoToCart = () => {
    handleCloseModal();
    showCart();
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        className={cls.modal}
      >
        <p className={cls.modalText}>
          The item has been added to your shopping cart.
        </p>
        <div className={cls.modalActions}>
          <Button onClick={handleGoToCart}>Go to Shopping Cart</Button>
        </div>
      </Modal>
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
    </>
  );
};
