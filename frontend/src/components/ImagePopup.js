import React from 'react';

function ImagePopup(props) {
  return (
      <div className={`popup popup-img ${props.card && 'popup_opened'}`} >
        <div className="popup-img__container">
          <button className="button popup__btn-close" type="button" onClick={props.onClose}></button>
          <img
            className="popup-img__photo"
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            onClick={props.handleCardClick} />
          <h3 className="popup-img__title">{props.card ? props.card.name : ""}</h3>
        </div>
      </div>
  )
}

export default ImagePopup;