import { use, useActionState } from "react";

import { ShoppingCartContext } from "../../store/shopping-cart-context";

import { SubmitButton } from "../UI/SubmitButton";
import { Input } from "../UI/Input";

import { ProductsContext } from "../../store/products-context";
import { isEmail, isNotEmpty } from "../../utils/validation";

import cls from "./CheckoutForm.module.css";
import {
  getFormattedTotalPrice,
  getTotalPrice,
} from "../../utils/getTotalPrice";

export const CheckoutForm = ({ onOpenNotificationModal }) => {
  const { addOrder } = use(ProductsContext);
  const { items, clearCart } = use(ShoppingCartContext);

  const formattedTotalPrice = getFormattedTotalPrice(getTotalPrice(items));

  async function checkoutFormAction(_prevFormState, formData) {
    try {
      // const userData = Object.entries(formData);

      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const street = formData.get("street");
      const postalCode = formData.get("postalCode");
      const city = formData.get("city");

      let errors = {};

      if (!isNotEmpty(fullName)) {
        errors.fullName = "Please enter your name.";
      }

      if (!isNotEmpty(email) || !isEmail(email)) {
        errors.email = "Please enter valid email.";
      }

      if (!isNotEmpty(street)) {
        errors.street = "Please enter your street.";
      }

      if (!isNotEmpty(postalCode)) {
        errors.postalCode = "Please enter your postal code.";
      }

      if (!isNotEmpty(city)) {
        errors.city = "Please enter your city.";
      }

      if (Object.values(errors).length > 0) {
        return {
          errors,
          enteredValues: {
            fullName,
            email,
            street,
            postalCode,
            city,
          },
        };
      }

      await addOrder({
        order: {
          items: items,
          customer: {
            name: fullName,
            email,
            street,
            ["postal-code"]: postalCode,
            city,
          },
        },
      });

      onOpenNotificationModal(
        "Your order was submitted successfully.",
        "success"
      );

      clearCart();

      return { errors: null };
    } catch (error) {
      console.error(error.message);

      onOpenNotificationModal(error.message, "error");

      return {};
    }
  }

  const [formState, formAction] = useActionState(checkoutFormAction, {
    errors: null,
  });

  return (
    <form action={formAction} className={cls.checkoutForm}>
      <p>{formattedTotalPrice}</p>
      <Input
        id="fullName"
        name="fullName"
        label="Full Name"
        defaultValue={formState.enteredValues?.fullName}
        error={formState.errors?.fullName}
      />
      <Input
        id="email"
        name="email"
        label="Email"
        type="email"
        defaultValue={formState.enteredValues?.email}
        error={formState.errors?.email}
      />
      <Input
        id="street"
        name="street"
        label="Street"
        defaultValue={formState.enteredValues?.street}
        error={formState.errors?.street}
      />
      <div className={cls.info}>
        <Input
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          type="number"
          defaultValue={formState.enteredValues?.postalCode}
          error={formState.errors?.postalCode}
        />
        <Input
          id="city"
          name="city"
          label="City"
          defaultValue={formState.enteredValues?.city}
          error={formState.errors?.city}
        />
      </div>

      <SubmitButton />
    </form>
  );
};
