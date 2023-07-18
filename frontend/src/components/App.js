import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth';

function App() {
  //хук для навигации
  const navigate = useNavigate();
  //переменная для логина юзера
  const [loggedIn, setLoggedIn] = useState(false);
  //переменная для мейла
  const [email, setEmail] = useState('');
  //переменная состояния внутри попапа регистрации
  const [isSuccessful, setIsSuccessful] = useState(false);
  //переменная для открытия попапа регистрации
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  //стейты
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // инициализация начальных данных
  // useEffect(() => {
  //   if (loggedIn) {
  //   Promise.all([api.getUsersInfo(), api.getInitialCards()])
  //     .then(([currentUser, cards]) => {
  //       setCurrentUser(currentUser);
  //       setCards(cards);
  //     })
  //     .catch((err) => console.log(err));
  //   }
  // }, [loggedIn]);

  // // Проверка токена при первой загрузке
  // useEffect(() => {
  //   // const jwt = localStorage.getItem('jwt');
  //   // if (jwt) {
  //     auth
  //       // .getContent(jwt)
  //       .getContent()
  //       .then((res) => {
  //         setLoggedIn(true);
  //         setEmail(res.data.email);
  //         navigate('/');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   // }
  // }, [navigate]);
  useEffect(() => {
    if (!loggedIn) {
    return;
    }
    api
    .getUsersInfo()
      .then(({ currentUser }) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      return;
      }
      api
      .getInitialCards()
      .then(({ cards }) => setCards(cards))
      .catch((err) => console.log(err));
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      return;
      }
      auth
        .getContent()
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
  }, [navigate, loggedIn]);





  //обработчики тултип
  const handleInfoTooltip = () => {
    setInfoTooltipPopupOpen(true);
  }

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
  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  };

  //смена данных пользователя
  const handleUpdateUser = ({ name, about }) => {
    api
      .editUsersInfo(name, about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //смена аватара пользователя
  const handleUpdateAvatar = (avatar) => {
    api
      .editAvatar(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //добавление новой карточки
  const handleAddPlaceSubmit = (name, link) => {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //удаление своей карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((thisCard) => thisCard._id !== card._id)
        );
      })
      .catch((err) => console.log(err));
  };

  //лайк для карточки
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  //метод обработки для закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  };

   //функция для регистрации нового пользователя
   function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        handleInfoTooltip();
        setIsSuccessful(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  //функция для входа пользователя
  function handleLogin(email, password) {
    return auth
      .login(email, password)
      .then((data) => {
        if (data) {
          // localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  //функция для выхода из профиля пользователя
  function signOut() {
    // localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setEmail('');
  }

  // Обработчик для клика на оверлей
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
        email={email}
        loggedIn={loggedIn}
        onSignOut={signOut}
        />

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
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="submit"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
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
