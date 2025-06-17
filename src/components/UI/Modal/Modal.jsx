import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import cls from "./Modal.module.css";

export const Modal = ({ isOpen, children, onClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialogRef} onClose={onClose} className={cls.modal}>
      <button className={cls.closeBtn} onClick={onClose}>
        x
      </button>
      {isOpen ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
};
