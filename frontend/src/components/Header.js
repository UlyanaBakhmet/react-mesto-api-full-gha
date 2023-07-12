import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import headerLogo from "../images/logologo.svg";

function Header({ email, onSignOut }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClickBurger = () => setIsMenuVisible(!isMenuVisible);

  return (
    <header className={`header ${isMenuVisible ? "header_menu-visible" : ""}`}>
      <img className="logo" src={headerLogo} alt="логотип Mesto Russia" />

      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div
                className={`header__wrapper ${
                  isMenuVisible ? "header__wrapper_visible" : ""
                }`}
              >
                <p className="header__email">{email}</p>
                <button
                  type="button"
                  className="header__button"
                  onClick={onSignOut}
                >
                  Выйти
                </button>
              </div>
              <button
                type="button"
                className={`burger-button ${
                  isMenuVisible ? "burger-button_close" : ""
                }`}
                onClick={handleClickBurger}
              >
                <span className="burger-button__line" />
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
