import React from 'react';
import PopupWithForm from './PopupWithForm';

// Попап «Редактировать аватар профиля»
function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [nameDirty, setNameDirty] = React.useState(false);
  const [linkDirty, setLinkDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [linkError, setLinkError] = React.useState('');
  const [formValid, setFormValid] = React.useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
    nameValidation(e);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    linkValidation(e);
  }

  function nameValidation(e) {
    setNameDirty(true);
    if (e.target.value.length == 0) {
      setNameError('Вы пропустили это поле')
    } else if (e.target.value.length < 2) {
      setNameError(`Минимальное количество символов 2. Длина текста сейчас: ${e.target.value.length}`)
    } else if (e.target.value.length > 30) {
      setNameError(`Максимальное количество символов 30. Длина текста сейчас: ${e.target.value.length}`)
    }
    else {
      setNameError('')
    }
  }

  function linkValidation(e) {
    setLinkDirty(true);
    const regExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

    if (e.target.value.length == 0) {
      setLinkError('Вы пропустили это поле')
    } else if (!regExp.test(String(e.target.value))) {
      setLinkError('Введите адрес сайта')
    } else {
      setLinkError('')
    }
  }

  // Очищение инпута
  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
      setFormValid(false);
    } else {
      setNameError('');
      setLinkError('');
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    if ((nameError || linkError)) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, linkError])

  function handleSubmit(e) {
    e.preventDefault();   // Запрещаем браузеру переходить по адресу формы

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? 'Создание...' : 'Создать'}
      isLoading={props.isLoading}
      buttonStatus={formValid}>

      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_type_place-name"
        name="place-name"
        placeholder="Название"
        required
        id="place-name-input"
        minLength="2"
        maxLength="30" />
      {(nameDirty && nameError) && <span className="form__input-error popup__error_visible" id="place-name-input-error">{nameError}</span>}

      <input
        value={link}
        onChange={handleLinkChange}
        type="url"
        className="popup__input popup__input_type_place-link"
        name="place-link"
        placeholder="Cсылка на картинку"
        required
        id="place-link-input" />
      {(linkDirty && linkError) && <span className="form__input-error popup__error_visible" id="place-link-input-error">{linkError}</span>}
    </PopupWithForm>
  )
}

export default AddPlacePopup;