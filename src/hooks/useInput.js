import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [isEdited, setIsEdited] = useState(false);

  const isValueValid = validationFn(enteredValue);

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
    setIsEdited(false);
  };

  const handleInputBlur = () => setIsEdited(true);

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: isEdited && !isValueValid,
  };
}
