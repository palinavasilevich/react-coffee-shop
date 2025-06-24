import { useFormStatus } from "react-dom";
import { Button } from "../Button";
import { SmallLoader } from "../Loader/Loader";

export const SubmitButton = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <SmallLoader /> : text}
    </Button>
  );
};
