import cls from "./ErrorComponent.module.css";

export const ErrorComponent = ({ title, message }) => {
  return (
    <div className={cls.error}>
      <h2 className={cls.title}>{title}</h2>
      <p className={cls.message}>{message}</p>
    </div>
  );
};
