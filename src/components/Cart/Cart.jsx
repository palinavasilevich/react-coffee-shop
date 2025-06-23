import { use } from "react";

import ShoppingCartContext from "../../store/shopping-cart-context";
import UserProgressContext from "../../store/user-progress-context";

import { Button } from "../UI/Button";
import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem/CartItem";

import { getTotalPrice } from "../../utils/getTotalPrice";
import { currencyFormatter } from "../../utils/currencyFormatter";

import { USER_PROGRESS_STATE } from "../../constants";

import cls from "./Cart.module.css";

export const Cart = () => {
  const { items, updateItemQuantity } = use(ShoppingCartContext);
  const { progress, showCheckout, hideCart } = use(UserProgressContext);

  const cartTotalPrice = getTotalPrice(items);

  function handleCloseCart() {
    hideCart();
  }

  function handleGoToCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className={cls.cart}
      isOpen={progress === USER_PROGRESS_STATE.CART}
      onClose={progress === USER_PROGRESS_STATE.CART ? handleCloseCart : null}
    >
      <h2 className={cls.title}>Your Cart</h2>
      {items.length === 0 && <p className={cls.text}>No items in cart!</p>}
      {items.length > 0 && (
        <>
          <ul className={cls.products}>
            {items.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrease={() => updateItemQuantity(item.id, 1)}
                  onDecrease={() => updateItemQuantity(item.id, -1)}
                />
              );
            })}
          </ul>

          <p className={cls.totalPrice}>
            Cart Total:{" "}
            <strong>{currencyFormatter.format(cartTotalPrice)}</strong>
          </p>

          <div className={cls.modalActions}>
            <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
          </div>
        </>
      )}
    </Modal>
  );
};
