function ImagePopup({ card, onOverlayClick, onClose }) {
  return (
    <div
      className={
        card ? `popup popup_type_img popup_opened` : `popup popup_type_img`
      }
      onClick={onOverlayClick}
    >
      <div className="popup__img-container">
        <button
          className="popup__close-button close-img-popup"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__img-figure">
          <img
            className="popup__img"
            src={card ? card.link : "#"}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__figcaption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
