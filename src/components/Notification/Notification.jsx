import cls from "./Notification.module.css";

export const Notification = ({ text, type, children }) => {
  return (
    <div className={cls.notification}>
      <p
        className={
          type === "error" ? cls.error : type === "success" ? cls.success : ""
        }
      >
        {text}
      </p>
      <div className="actions">{children}</div>
    </div>
  );
};
