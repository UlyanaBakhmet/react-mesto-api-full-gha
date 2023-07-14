import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const { link, name, owner, likes } = card;

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((like) => like._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  const handlePhotoClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  // Функция обработчик клика на лайк
  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handlePhotoClick}
      />
      <div className="card__info">
        <h2 className="card__name">{name}</h2>

        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-calculator">{likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="card__button-delete"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
    </li>
  );
}

export default Card;
