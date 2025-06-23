import { Button } from "../../UI/Button";

import { currencyFormatter } from "../../../utils/currencyFormatter";

import cls from "./CartItem.module.css";

export const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className={cls.cartItem}>
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>

      <div className={cls.actions}>
        <Button roundButton onClick={onDecrease}>
          -
        </Button>
        <span>{quantity}</span>

        <Button roundButton onClick={onIncrease}>
          +
        </Button>
      </div>
    </li>
  );
};
