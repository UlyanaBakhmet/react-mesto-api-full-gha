import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, onOverlayClick, isOpen, onClose, isLoading }) {
const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    })
  };

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      buttonText={isLoading? 'Обновление...' : 'Обновить аватар'}
    >
      <input
      ref={inputRef}
        className="popup__input popup__input_type_avatar-link"
        id="avatarLink"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__error avatarLink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

