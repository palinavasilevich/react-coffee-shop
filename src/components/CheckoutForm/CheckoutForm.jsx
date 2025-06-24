import { use, useActionState } from "react";

import ShoppingCartContext from "../../store/shopping-cart-context";
import UserProgressContext from "../../store/user-progress-context";

import { SubmitButton } from "../UI/SubmitButton";
import { Input } from "../UI/Input";
import { Modal } from "../UI/Modal";

import { isEmail, isNotEmpty } from "../../utils/validation";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { currencyFormatter } from "../../utils/currencyFormatter";

import { USER_PROGRESS_STATE } from "../../constants";

import cls from "./CheckoutForm.module.css";
import { ProductsContext } from "../../store/products-context";

export const CheckoutForm = () => {
  const { addOrder } = use(ProductsContext);
  const { items, clearCart } = use(ShoppingCartContext);
  const { progress, hideCheckout } = use(UserProgressContext);

  const cartTotalPrice = getTotalPrice(items);

  // function handleCloseCheckoutForm() {}

  async function checkoutFormAction(_prevFormState, formData) {
    try {
      const userData = Object.fromEntries(formData.entries());

      // const fullName = formData.get("full-name");
      // const email = formData.get("email");
      // const street = formData.get("street");
      // const postalCode = formData.get("postal-code");
      // const city = formData.get("city");

      let errors = {};

      if (!isNotEmpty(userData.name)) {
        errors.fullName = "Please enter your name.";
      }

      if (!isNotEmpty(userData.email) || !isEmail(userData.email)) {
        errors.email = "Please enter valid email.";
      }

      if (!isNotEmpty(userData.street)) {
        errors.street = "Please enter your street.";
      }

      if (!isNotEmpty(userData["postal-code"])) {
        errors.postalCode = "Please enter your postal code.";
      }

      if (!isNotEmpty(userData.city)) {
        errors.city = "Please enter your city.";
      }

      if (Object.values(errors).length > 0) {
        return {
          errors,
          enteredValues: {
            ...userData,
          },
        };
      }

      await addOrder({
        order: {
          items: items,
          customer: userData,
        },
      });

      // onOpenNotificationModal(
      //   "Your order was submitted successfully.",
      //   "success"
      // );

      clearCart();

      return { errors: null };
    } catch (error) {
      console.error(error.message);

      // onOpenNotificationModal(error.message, "error");

      return {};
    }
  }

  const [formState, formAction] = useActionState(checkoutFormAction, {
    errors: null,
  });

  return (
    <Modal
      isOpen={progress === USER_PROGRESS_STATE.CHECKOUT}
      onClose={hideCheckout}
    >
      <form action={formAction} className={cls.checkoutForm}>
        <h2>Checkout</h2>
        <p className={cls.price}>
          Total price: {currencyFormatter.format(cartTotalPrice)}
        </p>
        <Input
          id="name"
          label="Full Name"
          defaultValue={formState.enteredValues?.fullName}
          error={formState.errors?.fullName}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          defaultValue={formState.enteredValues?.email}
          error={formState.errors?.email}
        />
        <Input
          id="street"
          label="Street"
          defaultValue={formState.enteredValues?.street}
          error={formState.errors?.street}
        />
        <div className={cls.info}>
          <Input
            id="postal-code"
            label="Postal Code"
            type="number"
            defaultValue={formState.enteredValues?.postalCode}
            error={formState.errors?.postalCode}
          />
          <Input
            id="city"
            label="City"
            defaultValue={formState.enteredValues?.city}
            error={formState.errors?.city}
          />
        </div>

        <SubmitButton text="Submit Order" />
      </form>
    </Modal>
  );
};
