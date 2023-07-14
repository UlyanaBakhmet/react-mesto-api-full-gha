import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, onOverlayClick, isOpen, onClose }) {
  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
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
      buttonText="Сохранить"
    >
      <input
        className="popup__input popup__input_type_avatar-link"
        id="avatarLink"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        ref={inputRef}
        required
      />
      <span className="popup__error avatarLink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
