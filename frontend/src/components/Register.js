import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister, buttonText }) {
  const [formValue, setUserDataValue] = useState({
    email: "",
    password: "",
  });


  function handleChange(evt) {
    const { name, value } = evt.target;

    setUserDataValue({
      ...formValue,
      [name]: value,
    });
    }


  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValue;
    handleRegister(email, password);
  }

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Регистрация</h2>
        <input
          className="auth-form__item"
          name="email"
          type="email"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="auth-form__item"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={handleChange}
          required
        />
        <button
          className="auth-form__button popup__save-button"
          aria-label="Зарегистрироваться"
          type="submit"
        >
          {buttonText}
        </button>
        <span className="auth-form__advice">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth-form__link">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}

export default Register;
