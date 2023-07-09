import React from 'react';

// «Редактировать профиль», «Новое место», «Обновить аватар», «Вы уверены ?»
function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className={`popup__container ${(props.name == 'update-avatar' || props.name == 'delete') && `popup-${props.name}__container`}`}>
        <button className="button popup__btn-close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form popup__form popup__form-${props.name}`} onSubmit={props.onSubmit} name={`form-${props.name}`} method="get" noValidate>
          {props.children}
          <button className={`button popup__button popup__btn-${props.name} ${props.buttonStatus ? "" : 'popup__button_disabled'}`} type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;