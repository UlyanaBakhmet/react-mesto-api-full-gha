import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

  function Card({ onCardClick, onDeleteCard, onCardLike, card }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((id) => id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  const handlePhotoClick = () => {
    onCardClick(card);
  };

  function handleConfirmDeleteCardPopup() {
    onDeleteCard(card);
  };

  // Функция обработчик клика на лайк
    const handleCardLike = () => {
    onCardLike(card);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handlePhotoClick}
      />
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>

        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          ></button>
          <span className="card__like-calculator">{card.likes.length}</span>
        </div>
      </div>
      {/* отображаем кнопку удаления только на своих карточках */}
      {isOwn && (
        <button
          className="card__button-delete"
          aria-label="Delete"
          type="button"
          onClick={handleConfirmDeleteCardPopup}
        ></button>
      )}
    </li>
  );
}

export default Card;
