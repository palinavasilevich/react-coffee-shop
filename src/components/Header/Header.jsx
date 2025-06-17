import { use, useMemo } from "react";

import { Button } from "../UI/Button";
import { CartIcon } from "../UI/Icons/CartIcon";

import LogoIcon from "../../assets/logo-with-text.svg";

import cls from "./Header.module.css";
import { ShoppingCartContext } from "../../store/shopping-cart-context";

export const Header = ({ onOpenCart }) => {
  const { items } = use(ShoppingCartContext);

  const numberOfItemsInCart = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <header className={cls.header}>
      <div className="container">
        <nav>
          <ul className={cls.menu}>
            <li>
              <img src={LogoIcon} alt="Logo image" />
            </li>

            <li>
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
            </li>

            <li>
              <Button icon={CartIcon} onClick={onOpenCart} roundButton>
                <span className={cls.badge}>
                  {items.length > 0 && numberOfItemsInCart}
                </span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
