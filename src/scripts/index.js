import '../pages/index.css';
import { openModal, closeModal, closeModalHandlerByClick } from './modal.js'
import { startValidation, removeValidation, removeValidationHandler } from './validation.js'
import { createCard, getCardId, isLikedCard, isRemovableCard, updateLikeStatus } from './cards.js'
import { initialRequest, storeProfileRequest, storeAvatarRequest, deleteCardRequest, storeCardRequest, likeCardRequest } from './api.js'

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileEditButton = content.querySelector('.profile__edit-button');
const createCardButton = content.querySelector('.profile__add-button');
const profileIdItem = content.querySelector('.profile__id');
const profileTitleItem = content.querySelector('.profile__title');
const profileDescriptionItem = content.querySelector('.profile__description');
const profileImageItem = content.querySelector('.profile__image');

const editProfileDialog = document.querySelector('.popup_type_edit');
const editAvatarDialog = document.querySelector('.popup_type_edit-avatar');
const newCardDialog = document.querySelector('.popup_type_new-card');
const deleteCardDialog = document.querySelector('.popup_type_delete-card');
const previewDialog = document.querySelector('.popup_type_image');
const previewDialogImage = previewDialog.querySelector('.popup__image');
const previewDialogCaption = previewDialog.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const editAvatarForm = document.forms['edit-avatar'];
const deleteCardForm = document.forms['remove-place'];
const createCardForm = document.forms['new-place'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function openModalWithValidation(popup) {
  startValidation(popup, validationConfig);
  openModal(popup);
}

function applayProfile(data) {
  profileIdItem.textContent = data._id;
  profileTitleItem.textContent = data.name;
  profileDescriptionItem.textContent = data.about;
  profileImageItem.style['background-image'] = `url(${data.avatar})`;
}

function applyCards(data) {
  data.forEach((item) => {
    const card = createCard(item, previewCard,
      profileIdItem.textContent === item.owner._id ? openPopupDeleteCard : null,
      likeCard);
    updateLikeStatus(card, item, profileIdItem.textContent);
    placesList.append(card);
  });
}


function openPopupProfile(evt) {
  editProfileForm.elements.name.value = profileTitleItem.textContent;
  editProfileForm.elements.description.value = profileDescriptionItem.textContent;
  openModalWithValidation(editProfileDialog);
}

function sumbitPopupProfile(evt) {
  evt.preventDefault();
  const buttonText = editProfileForm.submit.textContent;
  editProfileForm.submit.textContent = "Сохранение...";

  storeProfileRequest(
    editProfileForm.elements.name.value,
    editProfileForm.elements.description.value,
    function (name, about) {
      profileTitleItem.textContent = name;
      profileDescriptionItem.textContent = about;
    },
    function () {
      closeModal(editProfileDialog);
      editProfileForm.submit.textContent = buttonText;
    }
  );
}


function openPopupAvatar(evt) {
  const path = profileImageItem.style['background-image'];
  if(/^URL\([\"\'].+[\"\']\)$/i.test(path)) {
    editAvatarForm.elements.link.value = path.slice(5, path.length - 2);
  }
  openModalWithValidation(editAvatarDialog);
}

function sumbitPopupAvatar(evt) {
  evt.preventDefault();
  const buttonText = editAvatarForm.submit.textContent;
  editAvatarForm.submit.textContent = "Сохранение...";

  storeAvatarRequest(
    editAvatarForm.elements.link.value,
    function (avatarLink) {
      profileImageItem.style['background-image'] = 'url(\"' + avatarLink + '\")';
    },
    function () {
      closeModal(editAvatarDialog);
      editAvatarForm.submit.textContent = buttonText;
    }
  );
}


function openPopupDeleteCard(event) {
  const card = event.target.closest('.card');
  deleteCardForm.elements['card-id'].value = getCardId(card);
  openModalWithValidation(deleteCardDialog);
}

function sumbitDeleteCard(evt) {
  evt.preventDefault();
  const buttonText = deleteCardForm.submit.textContent;
  deleteCardForm.submit.textContent = "Удаление...";

  deleteCardRequest(
    deleteCardForm.elements['card-id'].value, 
    function (cardId) {
      const cards = document.querySelectorAll('.card');
      const remCard = Array.from(cards).find(card => getCardId(card) === cardId);
      if(remCard) {
        remCard.remove();
      }
    },
    function () {
      closeModal(deleteCardDialog);
      deleteCardForm.submit.textContent = buttonText;
    }
  );
}


function openPopupNewCardOptions(evt) {
  openModalWithValidation(newCardDialog);
}

function sumbitNewCardOptions(evt) {
  evt.preventDefault();
  const buttonText = createCardForm.submit.textContent;
  createCardForm.submit.textContent = "Добавление...";

  storeCardRequest(
    createCardForm.elements['place-name'].value,
    createCardForm.elements.link.value,
    function (data) {
      const card = createCard(data, previewCard, openPopupDeleteCard, likeCard);
      updateLikeStatus(card, data, profileIdItem.textContent);
      placesList.prepend(card);
    },
    function () {
      closeModal(newCardDialog);
      createCardForm.submit.textContent = buttonText;
    }
  );
}


function previewCard(event) {
  const card = event.target.closest('.card');
  const cardImage = card.querySelector('.card__image');
  const cardDescription = card.querySelector('.card__title');
  previewDialogImage.src = cardImage.src;
  previewDialogImage.alt = cardImage.alt;
  previewDialogCaption.textContent = cardDescription.textContent;
  openModal(previewDialog);
}


document.addEventListener('click', closeModalHandlerByClick);
document.addEventListener('closePopup', removeValidationHandler);
profileEditButton.addEventListener('click', openPopupProfile);
profileImageItem.addEventListener('click', openPopupAvatar);
createCardButton.addEventListener('click', openPopupNewCardOptions);

editProfileForm.addEventListener('submit', sumbitPopupProfile);
editAvatarForm.addEventListener('submit', sumbitPopupAvatar);
deleteCardForm.addEventListener('submit', sumbitDeleteCard);
createCardForm.addEventListener('submit', sumbitNewCardOptions);

initialRequest(applayProfile, applyCards);

function likeCard(event) {
  const card = event.target.closest('.card');
  likeCardRequest(getCardId(card), !isLikedCard(card),
    data => updateLikeStatus(card, data, profileIdItem.textContent));
}
