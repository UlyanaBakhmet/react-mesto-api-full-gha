import React from "react";
import PopupWithForm from "./PopupWithForm";

//компонент попапа с формой подтверждения удаления карточки
function PopupWithConfirmation({
  isOpen,
  onClose,
  onCardDelete,
  isLoading,
  onOverlayClick,
}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onCardDelete();
  };

  return (
    <PopupWithForm
      name="card-submit"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
    />
  );
}

export default PopupWithConfirmation;