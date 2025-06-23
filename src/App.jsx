import { useState } from "react";

import { ProductsContextProvider } from "./store/products-context";
import { ShoppingCartContextProvider } from "./store/shopping-cart-context";
import { UserProgressContextProvider } from "./store/user-progress-context";

import { Header } from "./components/Header";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";

function App() {
  // const [notificationInfo, setNotificationInfo] = useState({
  //   text: "",
  //   type: "",
  // });

  // const {
  //   isModalOpen: isCartModalOpen,
  //   openModal: openCartModal,
  //   closeModal: closeCartModal,
  // } = useModal();

  // const {
  //   isModalOpen: isCheckoutFormModalOpen,
  //   openModal: openCheckoutFormModal,
  //   closeModal: closeCheckoutFormModal,
  // } = useModal();

  // const {
  //   isModalOpen: isNotificationModalOpen,
  //   openModal: openNotificationModal,
  //   closeModal: closeNotificationModal,
  // } = useModal();

  // const handleOpenNotificationModal = (text, type) => {
  //   setNotificationInfo({ text, type });

  //   openNotificationModal();
  // };

  return (
    <UserProgressContextProvider>
      <ProductsContextProvider>
        <ShoppingCartContextProvider>
          <Header />
          <main>
            <Products />
          </main>
          <Cart />
        </ShoppingCartContextProvider>
      </ProductsContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
