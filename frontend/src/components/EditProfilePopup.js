import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="editUserInformation"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__input popup__input_type_name"
        id="userName"
        type="text"
        minLength="2"
        maxLength="40"
        name="userName"
        placeholder="Имя пользователя"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="popup__error userName-error"></span>

      <input
        className="popup__input popup__input_type_profession"
        id="userProfession"
        type="text"
        minLength="2"
        maxLength="200"
        name="userProfession"
        placeholder="Расскажите о себе"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__error userProfession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
