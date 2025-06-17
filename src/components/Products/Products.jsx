import { use } from "react";

import { ShoppingCartContext } from "../../store/shopping-cart-context";

import { useModal } from "../../hooks/useModal.js";

import { ProductsContext } from "../../store/products-context";
import { ProductCard } from "../ProductCard/ProductCard";
import { Notification } from "../Notification";

import { Modal } from "../UI/Modal";
import { Button } from "../UI/Button";

import cls from "./Products.module.css";

export const Products = ({ onGoToCart }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { products } = use(ProductsContext);

  const { addItemToCart } = use(ShoppingCartContext);

  const handleAddItemToCart = (item) => {
    addItemToCart(item);
    openModal();
  };

  const handleGoToCart = () => {
    closeModal();
    onGoToCart();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Notification text="The item has been added to your shopping cart.">
          <Button onClick={handleGoToCart}>Go to Shopping cart</Button>
        </Notification>
      </Modal>
      <section className={cls.section}>
        <div className="container">
          <div className={cls.products}>
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddItemToCart={handleAddItemToCart}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
