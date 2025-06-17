import cls from "./Button.module.css";

export const Button = ({
  children,
  icon,
  roundButton,
  className,
  ...props
}) => {
  const Icon = icon;

  return (
    <button
      className={`${cls.button} ${
        roundButton ? cls.roundButton : ""
      } ${className}`}
      {...props}
    >
      {icon && <Icon className={cls.icon} />}
      {children}
    </button>
  );
};
