class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

// Универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._check)
  }

  // Проверка, всё ли в порядке с ответом
  _check(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  // Загрузка начальных карточек с сервера
  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  // Отправка отредактированных данных профиля на сервер
  setUserInfo({ name, about }) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }) //Делаем из объекта строку JSON
    })
  }

  // Добавление новой карточки
  addNewCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  //Добавление и удаление лайка карточки
  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method,
      headers: this._headers
    })
  }

  // Постановка лайка (Отдельно)
  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  // Cнятие лайка (Отдельно)
  removeLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  // Изменение автара
  editAvatar({ avatar }) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }) //Делаем из объекта строку JSON
    })
  }
}

// Работа с сервером
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '1b89146d-38a1-46b2-8f80-71ac6c2466b0',
    'Content-Type': 'application/json',
  }
});

export default api;
