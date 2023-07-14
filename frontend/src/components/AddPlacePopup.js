import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onOverlayClick, onAddPlace, isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleTitleInput = (evt) => {
    setTitle(evt.target.value);
  };

  const handleLinkInput = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(title, link);
  };

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_card-name"
        id="cardName"
        type="text"
        minLength="2"
        maxLength="30"
        name="name"
        placeholder="Название"
        required
        onChange={handleTitleInput}
        value={title}
      />
      <span className="popup__error cardName-error"></span>
      <input
        className="popup__input popup__input_type_card-link"
        id="cardLink"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkInput}
        value={link}
      />
      <span className="popup__error cardLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
