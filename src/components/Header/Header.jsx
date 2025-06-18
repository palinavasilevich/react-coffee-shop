import { use, useMemo } from "react";

import { Button } from "../UI/Button";
import { CartIcon } from "../UI/Icons/CartIcon";
import { ShoppingCartContext } from "../../store/shopping-cart-context";

import LogoIcon from "../../assets/logo.svg";

import cls from "./Header.module.css";

export const Header = ({ onOpenCart }) => {
  const { items } = use(ShoppingCartContext);

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

          {/* <li>
            <a href="#about" className={cls.link}>
              About us
            </a>
          </li>

          <li>
            <a href="#promotion" className={cls.link}>
              Promotion
            </a>
          </li>

          <li>
            <a href="#shop" className={cls.link}>
              Shop
            </a>
          </li>

          <li>
            <a href="#contacts" className={cls.link}>
              Contacts
            </a>
          </li> */}

          <li>
            <Button icon={CartIcon} onClick={onOpenCart} roundButton>
              <span className={cls.badge}>
                {items.length > 0 && numberOfItemsInCart}
              </span>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
