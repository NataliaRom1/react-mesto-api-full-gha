class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._credentials = config.credentials;
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
    return Promise.reject(`Ошибка: ${res.status} + ${res.message}` );
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials
    })
  }

  // Загрузка начальных карточек с сервера
  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials
    })
  }

  // Отправка отредактированных данных профиля на сервер
  setUserInfo({ name, about }) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, about }), //Делаем из объекта строку JSON
      credentials: 'include'
    })

  }

  // Добавление новой карточки
  addNewCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
      credentials: this._credentials
    })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials
    })
  }

  //Добавление и удаление лайка карточки
  toggleLike(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method,
      headers: this._headers,
      credentials: this._credentials
    })
  }

  // Постановка лайка (Отдельно)
  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: this._credentials
    })
  }

  // Cнятие лайка (Отдельно)
  removeLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials
    })
  }

  // Изменение автара
  editAvatar({ avatar }) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }), //Делаем из объекта строку JSON
      credentials: this._credentials
    })
  }
}

// Работа с сервером
const api = new Api({

  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Куки посылаются вместе с запросом
});

export default api;
