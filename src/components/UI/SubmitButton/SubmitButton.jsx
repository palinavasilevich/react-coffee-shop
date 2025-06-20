import { useFormStatus } from "react-dom";
import { Button } from "../Button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {/* {pending ? "Submitting..." : "Submit Order"} */}
      Submit Order
    </Button>
  );
};
