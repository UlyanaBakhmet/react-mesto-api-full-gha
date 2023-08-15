import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteCard,
  onCardLike,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__box">
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={onEditAvatar}
          ></button>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onDeleteCard={onDeleteCard}
              onCardLike={onCardLike}
            ></Card>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
