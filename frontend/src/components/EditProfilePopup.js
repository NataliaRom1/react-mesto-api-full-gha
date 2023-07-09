import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Попап «Редактировать профиль»
function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameDirty, setNameDirty] = React.useState(false);
  const [descriptionDirty, setDescriptionDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [formValid, setFormValid] = React.useState(true);

  function handleNameChange(e) {
    setName(e.target.value);
    nameValidation(e);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    descriptionValidation(e);
  }

  function nameValidation(e) {
    setNameDirty(true);
    if (e.target.value.length == 0) {
      setNameError('Вы пропустили это поле')
    } else if (e.target.value.length < 2) {
      setNameError(`Минимальное количество символов 2. Длина текста сейчас: ${e.target.value.length}`)
    } else if (e.target.value.length > 40) {
      setNameError(`Максимальное количество символов 40. Длина текста сейчас: ${e.target.value.length}`)
    }
    else {
      setNameError('')
    }
  }

  function descriptionValidation(e) {
    setDescriptionDirty(true);
    if (e.target.value.length == 0) {
      setDescriptionError('Вы пропустили это поле')
    } else if (e.target.value.length < 2) {
      setDescriptionError(`Минимальное количество символов 2. Длина текста сейчас: ${e.target.value.length}`)
    } else if (e.target.value.length > 200) {
      setDescriptionError(`Максимальное количество символов 40. Длина текста сейчас: ${e.target.value.length}`)
    }
    else {
      setDescriptionError('')
    }
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setFormValid(true);
    }
    else if (props.onClose) {
      setNameError('');
      setDescriptionError('');
    }
  }, [props.isOpen, currentUser])

  React.useEffect(() => {
    if ((nameError || descriptionError)) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, descriptionError])

  function handleSubmit(e) {
    e.preventDefault();     // Запрещаем браузеру переходить по адресу формы

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    < PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isLoading={props.isLoading}
      buttonStatus={formValid}>

      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Ваше имя"
        id="name-input"
        required
      />
      {(nameDirty && nameError) && <span className="form__input-error popup__error_visible" id="name-input-error">{nameError}</span>}

      <input
        value={description}
        onChange={handleDescriptionChange}
        type="text"
        className="popup__input popup__input_type_description"
        name="info"
        placeholder="Расскажите о себе"
        id="description-input"
        required
      />
      {(descriptionDirty && descriptionError) && <span className="form__input-error popup__error_visible" id="description-input-error">{descriptionError}</span>}
    </PopupWithForm >
  )
}

export default EditProfilePopup;