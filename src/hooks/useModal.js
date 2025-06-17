import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeAllOpenModals() {
    const modalContainer = document.getElementById("modal");
    const modals = modalContainer.querySelectorAll("dialog");
    modals.forEach((modal) => {
      if (modal.open) {
        modal.close();
      }
    });
  }

  function openModal() {
    closeAllOpenModals();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
