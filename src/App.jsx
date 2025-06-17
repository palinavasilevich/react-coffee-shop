import { useState } from "react";

import { Header } from "./components/Header";
import { Products } from "./components/Products/Products";
import { Modal } from "./components/UI/Modal";
import { ProductsContextProvider } from "./store/products-context";
import { Cart } from "./components/Cart/Cart";
import { ShoppingCartContextProvider } from "./store/shopping-cart-context";
import { CheckoutForm } from "./components/CheckoutForm/CheckoutForm";
import { useModal } from "./hooks/useModal";
import { Notification } from "./components/Notification";

function App() {
  const [notificationInfo, setNotificationInfo] = useState({
    text: "",
    type: "",
  });

  const {
    isModalOpen: isCartModalOpen,
    openModal: openCartModal,
    closeModal: closeCartModal,
  } = useModal();

  const {
    isModalOpen: isCheckoutFormModalOpen,
    openModal: openCheckoutFormModal,
    closeModal: closeCheckoutFormModal,
  } = useModal();

  const {
    isModalOpen: isNotificationModalOpen,
    openModal: openNotificationModal,
    closeModal: closeNotificationModal,
  } = useModal();

  const handleOpenNotificationModal = (text, type) => {
    setNotificationInfo({ text, type });

    openNotificationModal();
  };

  return (
    <ProductsContextProvider>
      <ShoppingCartContextProvider>
        <Modal
          isOpen={isNotificationModalOpen}
          onClose={closeNotificationModal}
        >
          <Notification
            text={notificationInfo.text}
            type={notificationInfo.type}
          />
        </Modal>

        <Modal isOpen={isCartModalOpen} onClose={closeCartModal}>
          <Cart onGoToCheckout={openCheckoutFormModal} />
        </Modal>

        <Modal
          isOpen={isCheckoutFormModalOpen}
          onClose={closeCheckoutFormModal}
        >
          <CheckoutForm onOpenNotificationModal={handleOpenNotificationModal} />
        </Modal>

        <Header onOpenCart={openCartModal} />
        <main>
          <Products onGoToCart={openCartModal} />
        </main>
      </ShoppingCartContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
