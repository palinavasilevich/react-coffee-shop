import cls from "./Input.module.css";

export const Input = ({ label, error, ...props }) => {
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={props.id} className={cls.label}>
        {label}
      </label>
      <input
        className={`${cls.input} ${error ? cls.isNotValid : ""}`}
        type="text"
        {...props}
      />
      <div className={cls.controlError}>
        {error && <p className={cls.errorText}>{error}</p>}
      </div>
    </div>
  );
};
