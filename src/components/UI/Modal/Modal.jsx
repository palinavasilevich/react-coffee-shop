import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import cls from "./Modal.module.css";

export const Modal = ({ isOpen, children, className = "", onClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;

    if (isOpen) {
      modal.showModal();
    }

    return () => modal.close();
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`${cls.modal} ${className}`}
    >
      <button className={cls.closeBtn} onClick={onClose}>
        x
      </button>
      {isOpen ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
};
