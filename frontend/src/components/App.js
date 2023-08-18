import React, { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  //хук для навигации
  const navigate = useNavigate();
  //переменная для логина юзера
  const [loggedIn, setLoggedIn] = useState(false);
  //переменная для мейла
  const [email, setEmail] = useState("");
  //переменная состояния внутри попапа регистрации
  const [isSuccessful, setIsSuccessful] = useState(false);
  // const [isSuccessful, setIsSuccessful] = useState(false);
  //переменная для открытия попапа регистрации
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  //переменная состояния открытого модального окна
  const [isLoading, setIsLoading] = useState(false);
  //переменная состояния информации пользователя
  const [currentUser, setCurrentUser] = useState({});
  //переменная состояния начального массива карточек
  const [cards, setCards] = useState([]);
  //переменная состояния попапа обновления данных пользователя
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //переменная состояния попапа обновления аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //переменная состояния попапа подтверждения
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  //переменные состояния попапа с увеличенной картинки карточки
  const [selectedCard, setSelectedCard] = useState(null);
  //переменная состояния карточки для удаления
  const [cardToDelete, setCardToDelete] = useState({});

  // инициализация начальных данных
  useEffect(() => {
    if (loggedIn === true) {
      Promise.all([api.getUsersInfo(), api.getInitialCards()])
        .then(([dataUser, cards]) => {
          setCurrentUser(dataUser);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Проверка токена при первой загрузке
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .tokenCheck(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Неверный токен`, err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //обработчики тултип
  const handleInfoTooltip = () => {
    setInfoTooltipPopupOpen(true);
  };

  //метод обработки клика для открытия попапа с данными пользователя
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //метод обработки клика для открытия попапа с аватаром
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //метод обработки клика для открытия попапа с добавлением новой фотокарточки
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //метод обработки для открытия попапа с увеличенной карточкой
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //метод обработки открытия попапа с подтверждением удаления карточки
  function handleConfirmDeleteCardPopup(card) {
    setIsConfirmPopupOpen(true);
    setCardToDelete(card);
  }

  //метод обработки для закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  };

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api
      .editUsersInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //смена аватара пользователя
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара пользователя: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //добавление новой карточки
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении карточки: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при снятии лайка: ${err}`);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении лайка: ${err}`);
        });
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          handleInfoTooltip();
          setIsSuccessful(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  //функция для входа пользователя
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setAuthToken(data.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        handleInfoTooltip();
        // setIsSuccessful(false)
        console.log(err);
      });
  }

  //функция для выхода из профиля пользователя
  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
    setLoggedIn(false);
  };

  // Обработчик для клика на оверлей
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} loggedIn={loggedIn} onSignOut={signOut} />

        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={handleRegister}
                name="register"
                title="Регистрация"
                buttonText="Зарегистрироваться"
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                name="login"
                title="Вход"
                buttonText="Войти"
              />
            }
          />
          <Route
            path="/"
            element={
              <>
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onDeleteCard={handleConfirmDeleteCardPopup}
                  cards={cards}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onOverlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        <PopupWithConfirmation
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardToDelete={cardToDelete}
          isLoading={isLoading}
        ></PopupWithConfirmation>

        <ImagePopup
          isOpen={isConfirmPopupOpen}
          card={selectedCard}
          onOverlayClick={handleOverlayClick}
          onClose={closeAllPopups}
        ></ImagePopup>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
