import React from 'react';
import PopupWithForm from './PopupWithForm';

// Попап «Редактировать аватар профиля»
function EditAvatarPopup(props) {
  const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  const [linkDirty, setLinkDirty] = React.useState(false);
  const [linkError, setLinkError] = React.useState('');
  const [formValid, setFormValid] = React.useState(true);

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

  function handleSubmit(e) {
    e.preventDefault();   // Запрещаем браузеру переходить по адресу формы

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  // Очищение инпута
  React.useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = "";
      setFormValid(false);
    }
     else {
      setLinkError('');
    }
  }, [props.isOpen]);


  React.useEffect(() => {
    if ((linkError)) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [linkError])

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isLoading={props.isLoading}
      buttonStatus={formValid}>

      <input
        ref={avatarRef}
        onChange={linkValidation}
        type="url"
        className="popup__input popup__input_type_avatar-link"
        name="avatar-link"
        placeholder="Ссылка на фото"
        required
        id="avatar-link-input" />
      {(linkDirty && linkError) && <span className="form__input-error popup__error_visible" id="avatar-link-input-error">{linkError}</span>}

    </PopupWithForm>
  )
}

export default EditAvatarPopup;