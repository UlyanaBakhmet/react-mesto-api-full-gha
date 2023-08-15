import { apiConfig } from "./constants.js";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;

    const token = localStorage.getItem("jwt")
    // const token = localStorage.getItem("token")
    if (token)
      this.setAuthToken(token);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setAuthToken (token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  //получаем данные своего пользователя
  getUsersInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      // credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //получение карточек от сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      // credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //обновить данные своего пользователя
// editUsersInfo({userName, userProfession}) {
  editUsersInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      // credentials: this._credentials,
      headers: this._headers,
      // credentials: "include",
      body: JSON.stringify({
      //   name: userName,
      //   about: userProfession,
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
      // credentials: "include",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //удалить карточку
  // deleteCard(id) {
    deleteCard(cardId) {
    // return fetch(`${this._url}/cards/${id}`, {
      return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      // credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //поставить карточке лайк
  // addLike(id) {
  addLike(cardId) {
    // return fetch(`${this._url}/cards/${id}/likes`, {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      // credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //удалить с карточки лайк
  // deleteLike(id) {
  deleteLike(cardId) {
    // return fetch(`${this._url}/cards/${id}/likes`, {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      // credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  //обновить свой аватар
  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      // credentials: "include",
      body: JSON.stringify(avatar),
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api(apiConfig);

export default api;
