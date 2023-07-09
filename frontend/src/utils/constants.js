export const popupElementList = document.querySelectorAll('.popup');

export const popupEditElement = document.querySelector('.popup-edit'); //имя попап
export const popupAddElement = document.querySelector('.popup-add'); //карточка попап
export const popupImgElement = document.querySelector('.popup-img'); //картинка попап
export const popupEditAvatarElement = document.querySelector('.popup-update-avatar') //попап редактирования аватара

export const popupCloseButtonElement = document.querySelectorAll('.popup__btn-close');
export const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__btn-close');
export const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__btn-close');
export const popupImgCloseButtonElement = popupImgElement.querySelector('.popup__btn-close');

export const popupImgPhotoElement = popupImgElement.querySelector('.popup-img__photo');
export const popupImgTitleElement = popupImgElement.querySelector('.popup-img__title');

export const popupEditOpenButtonElement = document.querySelector('.profile__btn-edit'); //открыть попап ред. профиля
export const popupAddOpenButtonElement = document.querySelector('.profile__btn-add'); //открыть попап созд. карточки
export const avatarEditOpenButtonElement = document.querySelector('.profile__btn-edit-avatar'); //открыть попап редактирования аватара
export const popupDeleteOpenButtonElement = document.querySelector('.element__trash-img'); //открыть попап удаления карточки - корзина
export const cardCreateButtonElement = document.querySelector('.popup__btn-create'); //кнопка создание карточки из попапа
export const profileDataSaveButtonElement = document.querySelector('.popup__btn-save');//кнопка сохранени данных профиля пользователя
export const cardDeleteButtonElement = document.querySelector('.popup__btn-delete'); //кнопка удаления карточки из попапа

export const formEditElement = popupEditElement.querySelector('.popup__form-edit');
export const formAddElement = popupAddElement.querySelector('.popup__form-add');
export const formEditAvatarElement = popupEditAvatarElement.querySelector('.popup__form-update-avatar');

export const nameInput = popupEditElement.querySelector('.popup__input_type_name');
export const descriptionInput = popupEditElement.querySelector('.popup__input_type_description');
export const placeTitleInput = popupAddElement.querySelector('.popup__input_type_place-name');
export const placeLinkInput = popupAddElement.querySelector('.popup__input_type_place-link');

export const profileNameElement = document.querySelector('.profile__name');
export const profileDescriptionElement = document.querySelector('.profile__description');

export const cardContainerElement = document.querySelector('.elements');
export const cardTemplateElement = document.querySelector('#element-template');
