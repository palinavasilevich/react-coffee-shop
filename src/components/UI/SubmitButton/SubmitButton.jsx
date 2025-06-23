import { useFormStatus } from "react-dom";
import { Button } from "../Button";

export const SubmitButton = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {/* {pending ? "Submitting..." : "Submit Order"} */}
      {text}
    </Button>
  );
};
