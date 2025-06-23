import cls from "./Input.module.css";

export const Input = ({ id, label, error, ...props }) => {
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={id} className={cls.label}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        // required
        type="text"
        className={`${cls.input} ${error ? cls.isNotValid : ""}`}
        {...props}
      />
      <div className={cls.controlError}>
        {error && <p className={cls.errorText}>{error}</p>}
      </div>
    </div>
  );
};
