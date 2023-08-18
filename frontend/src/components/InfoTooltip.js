import React from "react";
import error from "../images/error.png";
import success from "../images/success2.png";

function InfoTooltip({ isOpen, onClose, isSuccessful, onOverlayClick }) {
  // const message = `${
  //   isSuccessful
  //     ? "Вы успешно зарегистрировались!"
  //     : `Что-то пошло не так!
  //   Попробуйте ещё раз.`
  // }`;
  const text = isSuccessful
  ? "Вы успешно зарегистрировались!"
  : `Что-то пошло не так!
    Попробуйте ещё раз`

  // const icon = `${isSuccessful ? success : error}`;
  return (
    <section
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id="popup-info-tooltip"
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        {/* <img
          className="popup__icon popup__icon_type_tooltip"
          // src={icon}
          src={isSuccessful.status ? success : error}
          // alt={message}
          alt='статус регистрации'
        /> */}
        {isSuccessful ? (
        <img 
        className="popup__icon popup__icon_type_tooltip"
        src={success}
        alt='Успешно'
        />
        ) : (
        <img 
        className="popup__icon popup__icon_type_tooltip"
        src={error}
        alt='Не успешно'
        />
        )}
        <p className="popup__info">{text}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
