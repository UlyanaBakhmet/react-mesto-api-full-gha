function PopupWithForm({
  children,
  title,
  name,
  buttonText,
  onSubmit,
  onOverlayClick,
  isOpen,
  onClose,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          method="get"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
        <button
          className={`popup__close-button close-${name}-popup`}
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
