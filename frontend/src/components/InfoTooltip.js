import React from 'react';
import tick from '../images/tick.svg'
import cross from '../images/cross.svg'

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="button popup__btn-close" type="button" onClick={props.onClose}></button>
        <img className="popup__img" src={props.isSuccess ? tick : cross} alt={props.isSuccess ? "Изображение глочки" : "Изображение крестика"} />
        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip;