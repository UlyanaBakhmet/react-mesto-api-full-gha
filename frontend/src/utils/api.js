import { apiConfig } from "./constants.js";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;

    const token = localStorage.getItem("jwt")
    if (token)
      this.setAuthToken(token);
  }
// class Api {
//   constructor({ url, headers }) {
//     this._url = url;
//     this._headers = headers;
//   }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setAuthToken (token) {
    this._headers.Authorization = `Bearer ${token}`;
  }
  // setAuthToken() {
  //   this._headers.authorization = `Bearer${localStorage.getItem('jwt')}`;
  // }

  //получаем данные своего пользователя
  getUsersInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //получение карточек от сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //обновить данные своего пользователя
  editUsersInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then((res) => this._getResponseData(res));
  }

  //добавить карточку на сервер
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //удалить карточку
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //поставить карточке лайк
  addLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //удалить с карточки лайк
  deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //обновить свой аватар
  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api(apiConfig);

export default api;
