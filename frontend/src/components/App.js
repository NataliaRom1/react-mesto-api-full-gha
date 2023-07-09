import '../App.css';

import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const navigate = useNavigate();

  // Переменные состояния
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupAddOpen, setPopupAddOpen] = useState(false);
  const [isPopupEditAvatarOpen, setIsPopupEditAvatarOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик клика для попап редактирования
  function handleEditProfileClick() {
    setIsPopupEditOpen(true);
  }
  // Обработчик клика для попап добавления карточки
  function handleAddPlaceClick() {
    setPopupAddOpen(true);
  }
  // Обработчик клика для попап редактирования аватара
  function handleEditAvatarClick() {
    setIsPopupEditAvatarOpen(true);
  }
  // обработчик клика по карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Обработчик клика по крестику (закрытия попапов)
  function closeAllPopups() {
    setIsPopupEditOpen(false);
    setPopupAddOpen(false);
    setIsPopupEditAvatarOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  // Обработчик клика про лайку
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      });
  }

  // Обработчик клика по корзине
  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log('Ошибка: ', err))
      .finally(() =>
        setIsLoading(false))
  }

  // Обновление данных пользователя
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo({
      name: data.name,
      about: data.about,
    })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err))
      .finally(() =>
        setIsLoading(false))
  }

  // Обновление аватара профиля
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.editAvatar({ avatar: data.avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err))
      .finally(() =>
        setIsLoading(false))
  }
  //  Добавление карточки
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard({
      name: data.name,
      link: data.link
    })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log('Ошибка: ', err))
      .finally(() =>
        setIsLoading(false))
  }

  function checkToken() {
    const jwt = localStorage.getItem('token'); //Получаю token
    if (jwt) {
      auth.checkToken(jwt)
        .then(user => {
          if (user) {
            setLoggedIn(true);
            setEmail(user.data.email);
            navigate('/', { replace: true });
          }

        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleRegisteration({ email, password }) {
    auth.register(email, password)
      .then((data) => {
        if (data) {
          setIsSuccess(true);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((user) => {
        if (user.token) {
          localStorage.setItem('token', user.token); // Сохраняю token
          setLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');// Удаляю token
    navigate('/sign-in');
  };

  // Эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения
  useEffect(() => {
    if (loggedIn) {
      // Получение данных пользователя и начальных карточек с сервера вместе, если пользователь залогинился
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCardsData]) => {
          setCurrentUser(userData);
          setCards(initialCardsData);
        })
        .catch((err) => {
          console.log('Ошибка: ', err);
        })
    }
  }, [loggedIn])


  return (
    <div className="root">
      {/* «Внедряем» данные с помощью провайдера контекста */}
      <CurrentUserContext.Provider value={currentUser}>
        <>
          <Header onSignOut={handleSignOut} email={email} />
          <Routes>
            <Route path="/sign-up" element={<Register onRegister={handleRegisteration} />} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={
              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            } />
            <Route path="*" element={
              loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' replace />} />
          </Routes>

          {loggedIn ? <Footer /> : ''}

          {/* Попап редктирования профиля*/}
          <EditProfilePopup
            isOpen={isPopupEditOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoding={isLoading}
          />

          {/* Попап добавления карточки */}
          <AddPlacePopup
            isOpen={isPopupAddOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoding={isLoading}
          />

          {/* Попап удаления карточки */}
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText={isLoading ? 'Удаление...' : 'Да'}/>

          {/* Попап редактирования аватара профиля */}
          <EditAvatarPopup
            isOpen={isPopupEditAvatarOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoding={isLoading} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* Попап с информацией о результате регистрации */}
          <InfoTooltip
            name="info"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
