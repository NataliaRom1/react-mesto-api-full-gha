import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="main">
      <section className="profile">
        <button className="profile__btn-edit-avatar button" type="button" onClick={props.onEditAvatar}>
          <img className="profile__avatar" alt="Фото Жак-Ив Кусто" src={currentUser.avatar} />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="button profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="button profile__btn-add" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements" aria-label="Фотогалерея пользователя">
        {props.cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
        </section>
      </main>
  )
}

export default Main;