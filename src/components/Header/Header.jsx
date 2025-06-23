import { use, useMemo } from "react";

import ShoppingCartContext from "../../store/shopping-cart-context";
import UserProgressContext from "../../store/user-progress-context";

import { Button } from "../UI/Button";
import { CartIcon } from "../UI/Icons/CartIcon";

import LogoIcon from "../../assets/logo.svg";

import cls from "./Header.module.css";

export const Header = () => {
  const { items } = use(ShoppingCartContext);
  const { showCart } = use(UserProgressContext);

  const numberOfItemsInCart = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <header className={cls.header}>
      <nav>
        <ul className={cls.menu}>
          <li className={cls.logoContainer}>
            <img src={LogoIcon} alt="Logo image" className={cls.logoImg} />
            <h1 className={cls.logoTitle}>Samwayle</h1>
          </li>

          <li>
            <Button icon={CartIcon} onClick={showCart} roundButton>
              {items.length > 0 && (
                <span className={cls.badge}>{numberOfItemsInCart}</span>
              )}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
