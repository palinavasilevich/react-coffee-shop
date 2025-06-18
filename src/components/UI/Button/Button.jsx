import cls from "./Button.module.css";

export const Button = ({
  children,
  icon,
  roundButton,
  className,
  ...props
}) => {
  const Icon = icon;

  const cssClasses = `${cls.button} ${
    roundButton ? cls.roundButton : ""
  } ${className}`;

  return (
    <button className={cssClasses} {...props}>
      {icon && <Icon className={cls.icon} />}
      {children}
    </button>
  );
};
