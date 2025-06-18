import { use } from "react";
import { ShoppingCartContext } from "../../store/shopping-cart-context";
import { Button } from "../UI/Button";

import {
  getFormattedTotalPrice,
  getTotalPrice,
} from "../../utils/getTotalPrice";

import cls from "./Cart.module.css";

export const Cart = ({ onGoToCheckout }) => {
  const { items, updateItemQuantity } = use(ShoppingCartContext);

  const formattedTotalPrice = getFormattedTotalPrice(getTotalPrice(items));

  return (
    <div className={cls.cart}>
      {items.length === 0 && <p className={cls.text}>No items in cart!</p>}
      {items.length > 0 && (
        <>
          <ul className={cls.products}>
            {items.map((item) => {
              const formattedPrice = `€${Number(item.price).toFixed(2)}`;

              return (
                <li key={item.id} className={cls.item}>
                  <div>
                    <span>{item.name}</span>
                    <span> - {item.quantity} x </span>
                    <span>({formattedPrice})</span>
                  </div>
                  <div className={cls.actions}>
                    <Button
                      onClick={() => updateItemQuantity(item.id, -1)}
                      roundButton
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() => updateItemQuantity(item.id, 1)}
                      roundButton
                    >
                      +
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className={cls.totalPrice}>
            Cart Total: <strong>{formattedTotalPrice}</strong>
          </p>

          <div className={cls.modalActions}>
            <Button onClick={onGoToCheckout}>Go to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};
