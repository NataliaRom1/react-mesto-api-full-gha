import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card } = props;
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like-icon ${isLiked && 'element__like-icon_active'}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleCardLike() {
    props.onCardLike(card);
  }

  function handleCardDelete() {
    props.onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && <button className="element__trash-img" type="button" onClick={handleCardDelete} />}
      <img className="element__img" src={card.link} alt={card.name} style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick} />
      <div className="element__description">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}></button>
          <div className="element__likes-num">{card.likes.length}</div>
        </div>
      </div>
    </article>
  )
}

export default Card;