import { use, useActionState, useEffect, useState } from "react";

import ShoppingCartContext from "../../store/shopping-cart-context";
import UserProgressContext from "../../store/user-progress-context";

import { SubmitButton } from "../UI/SubmitButton";
import { Input } from "../UI/Input";
import { Modal } from "../UI/Modal";
import { Loader } from "../UI/Loader";
import { ErrorComponent } from "../ErrorComponent";
import { Button } from "../UI/Button";

import { isEmail, isNotEmpty } from "../../utils/validation";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { currencyFormatter } from "../../utils/currencyFormatter";

import useHttp from "../../hooks/useHttp";

import { API_URL, USER_PROGRESS_STATE } from "../../constants";

import cls from "./CheckoutForm.module.css";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const CheckoutForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { items, clearCart } = use(ShoppingCartContext);
  const { progress, hideCheckout } = use(UserProgressContext);

  const cartTotalPrice = getTotalPrice(items);

  const { data, error, sendRequest, clearData, clearError } = useHttp(
    `${API_URL}/orderss`,
    requestConfig
  );

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleCloseCheckoutForm() {
    setFormErrors({});
    hideCheckout();
  }

  function handleClearError(fieldName) {
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  }

  function handleCloseModal() {
    clearError();
    setOpenModal(false);
  }

  async function checkoutFormAction(_prevFormState, formData) {
    try {
      setFormErrors({});

      const userData = Object.fromEntries(formData.entries());
      const errors = {};

      Object.keys(userData).forEach((fieldName) => {
        if (!isNotEmpty(userData[fieldName])) {
          errors[fieldName] = `Please enter ${fieldName}.`;
        }

        if (fieldName === "email" && !isEmail(userData[fieldName])) {
          errors[fieldName] = `Please enter a valid email.`;
        }
      });

      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        return { enteredValues: userData };
      }

      sendRequest(
        JSON.stringify({
          order: {
            items,
            customer: userData,
          },
        })
      );
    } catch (error) {
      console.error(error.message);
    }

    return {};
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutFormAction,
    {}
  );

  useEffect(() => {
    if (error) {
      setOpenModal(true);
    }
  }, [error]);

  if (data && !error) {
    return (
      <Modal
        isOpen={progress === USER_PROGRESS_STATE.CHECKOUT}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p className={cls.modalText}>Your order was submitted successfully.</p>
        <p className={cls.modalText}>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <div className={cls.modalActions}>
          <Button onClick={handleFinish}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <ErrorComponent title="Failed to submit order." message={error} />
      </Modal>

      <Modal
        isOpen={progress === USER_PROGRESS_STATE.CHECKOUT}
        onClose={handleCloseCheckoutForm}
      >
        <form action={formAction} className={cls.checkoutForm}>
          <h2>Checkout</h2>
          <p className={cls.price}>
            Total price: {currencyFormatter.format(cartTotalPrice)}
          </p>
          <Input
            id="name"
            label="Full Name"
            defaultValue={formState.enteredValues?.name}
            error={formErrors?.name}
            onFocus={() => handleClearError("name")}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            defaultValue={formState.enteredValues?.email}
            error={formErrors?.email}
            onFocus={() => handleClearError("email")}
          />
          <Input
            id="street"
            label="Street"
            defaultValue={formState.enteredValues?.street}
            error={formErrors?.street}
            onFocus={() => handleClearError("street")}
          />
          <div className={cls.info}>
            <Input
              id="postal-code"
              label="Postal Code"
              type="number"
              defaultValue={formState.enteredValues?.postalCode}
              error={formErrors["postal-code"]}
              onFocus={() => handleClearError("postal-code")}
            />
            <Input
              id="city"
              label="City"
              defaultValue={formState.enteredValues?.city}
              error={formErrors?.city}
              onFocus={() => handleClearError("city")}
            />
          </div>

          {isSending && <Loader />}

          <SubmitButton text="Submit Order" />
        </form>
      </Modal>
    </>
  );
};
