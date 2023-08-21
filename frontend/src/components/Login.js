import React, { useState } from "react";

function Login({ handleLogin, buttonText }) {
  const [formValues, setUserDataValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setUserDataValue({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValues;
    handleLogin(email, password);
  }

  return (
    <section className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-form__title">Вход</h2>
        <input
          className="auth-form__item"
          name="email"
          type="email"
          placeholder="E-mail"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth-form__item"
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <button
          className="auth-form__button popup__save-button"
          aria-label="Зайти в аккаунт"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default Login;
