// export const BASE_URL = "https://auth.nomoreparties.co"; //это у нас было от яндекса
export const BASE_URL = "http://localhost:3000"; //это после
// export const BASE_URL = "http://localhost:3001";
// export const BASE_URL = 'https://api.bakhmet.nomoredomains.xyz'; //это бэк

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
};

// export const getContent = (jwt) => {
  // export const getContent = () => {
  export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${jwt}`,
      Authorization: `Bearer ${token}`,
    },
    // credentials: "include",
  })
  .then(getResponse)
  // .then((data) => data);
};
