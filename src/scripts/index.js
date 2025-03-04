import '../pages/index.css';
import { clearValidation, enableValidation } from './validation.js'
import { openModal, closeModal, closeModalHandlerByClick } from './modal.js'
import { createCard, isLikedCard, updateLikeStatus } from './cards.js'
import { logApiError, loadProfile, loadCards, storeProfile, storeAvatar, deleteCard, storeCard, likeCard } from './api.js'

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
const cardCreationDialog = document.querySelector('.popup_type_new-card');
const cardDeletionDialog = document.querySelector('.popup_type_delete-card');
const previewDialog = document.querySelector('.popup_type_image');
const previewDialogImage = previewDialog.querySelector('.popup__image');
const previewDialogCaption = previewDialog.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const editAvatarForm = document.forms['edit-avatar'];
const deleteCardForm = document.forms['remove-place'];
const createCardForm = document.forms['new-place'];

const validationConfig = 
{
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function previewCardCallback(src, alt, description) {
  previewDialogImage.src = src;
  previewDialogImage.alt = alt;
  previewDialogCaption.textContent = description;
  openModal(previewDialog);
}

function likeCardCallback(card, cardId) {
  likeCard(cardId, !isLikedCard(card))
  .then(cardInfo => updateLikeStatus(card, cardInfo, profileId))
  .catch(logApiError);
}

function applayProfile(profileInfo) {
  globalThis.profileId = profileInfo._id;
  profileTitleItem.textContent = profileInfo.name;
  profileDescriptionItem.textContent = profileInfo.about;
  profileImageItem.style['background-image'] = `url(${profileInfo.avatar})`;
}

function appendCard(cardInfo) {
  const card = createCard(cardInfo, previewCardCallback,
    profileId === cardInfo.owner._id ? openCardDeletionDialog : null,
    likeCardCallback);
  updateLikeStatus(card, cardInfo, profileId);
  placesList.append(card);
}

function initializeProfileAndCards() {
  Promise.all([loadProfile().then(applayProfile), loadCards()])
  .then(function (results) {
    results[1].forEach(item => appendCard(item));
  }).catch(logApiError);
}

function openPopupProfile() {
  editProfileForm.reset();
  editProfileForm.elements.name.value = profileTitleItem.textContent;
  editProfileForm.elements.description.value = profileDescriptionItem.textContent;
  clearValidation(editProfileForm, validationConfig);  
  openModal(editProfileDialog);
}

function sumbitPopupProfile(event) {
  event.preventDefault();
  const buttonText = editProfileForm.submit.textContent;
  editProfileForm.submit.textContent = editProfileForm.submit.dataset.operation;

  storeProfile(
    editProfileForm.elements.name.value,
    editProfileForm.elements.description.value)
  .then(function (profileInfo) {
    profileTitleItem.textContent = profileInfo.name;
    profileDescriptionItem.textContent = profileInfo.about;
    closeModal(editProfileDialog);
  })
  .catch(logApiError)
  .finally(function () {
    editProfileForm.submit.textContent = buttonText;
  });
}


function openPopupAvatar() {
  editAvatarForm.reset();
  const path = profileImageItem.style['background-image'];
  if(/^URL\([\"\'].+[\"\']\)$/i.test(path)) {
    editAvatarForm.elements.link.value = path.slice(5, path.length - 2);
  }
  clearValidation(editAvatarForm, validationConfig);  
  openModal(editAvatarDialog);
}

function sumbitPopupAvatar(event) {
  event.preventDefault();
  const buttonText = editAvatarForm.submit.textContent;
  editAvatarForm.submit.textContent = editAvatarForm.submit.dataset.operation;

  storeAvatar(editAvatarForm.elements.link.value)
  .then(function (data) { 
    profileImageItem.style['background-image'] = 'url(\"' + data.avatar + '\")'; 
    closeModal(editAvatarDialog);
  })
  .catch(logApiError)
  .finally(function () {
    editAvatarForm.submit.textContent = buttonText;
  });
}

let dangerGlobalCardReferenceForDeletingCardLater = null;
function openCardDeletionDialog(card, cardId) {
  dangerGlobalCardReferenceForDeletingCardLater = { 
    Card: card, 
    CardId: cardId
  };
  openModal(cardDeletionDialog);
}

function sumbitDeleteCard(event) {
  event.preventDefault();
  if (!dangerGlobalCardReferenceForDeletingCardLater) {
    return;
  }

  const cardId = dangerGlobalCardReferenceForDeletingCardLater.CardId;
  const buttonText = deleteCardForm.submit.textContent;
  deleteCardForm.submit.textContent = deleteCardForm.submit.dataset.operation;

  deleteCard(cardId)
  .then(function () {
    if (dangerGlobalCardReferenceForDeletingCardLater) {
      dangerGlobalCardReferenceForDeletingCardLater.Card.remove();
      dangerGlobalCardReferenceForDeletingCardLater = null;
    }
    closeModal(cardDeletionDialog);
  })
  .catch(logApiError)
  .finally(function () {
    deleteCardForm.submit.textContent = buttonText;
  });
}


function openPopupNewCardOptions() {
  createCardForm.reset();
  clearValidation(createCardForm, validationConfig);
  openModal(cardCreationDialog);
}

function sumbitNewCardOptions(evt) {
  evt.preventDefault();
  const buttonText = createCardForm.submit.textContent;
  createCardForm.submit.textContent = createCardForm.submit.dataset.operation;

  storeCard(
    createCardForm.elements['place-name'].value,
    createCardForm.elements.link.value)
  .then(function (cardInfo) {
    const card = createCard(cardInfo, 
      previewCardCallback, openCardDeletionDialog, likeCardCallback);
    placesList.prepend(card);
    closeModal(cardCreationDialog);
  })
  .catch(logApiError)
  .finally(function () {
    createCardForm.submit.textContent = buttonText;
  });
}


document.addEventListener('click', closeModalHandlerByClick);
profileEditButton.addEventListener('click', openPopupProfile);
profileImageItem.addEventListener('click', openPopupAvatar);
createCardButton.addEventListener('click', openPopupNewCardOptions);

editProfileForm.addEventListener('submit', sumbitPopupProfile);
editAvatarForm.addEventListener('submit', sumbitPopupAvatar);
deleteCardForm.addEventListener('submit', sumbitDeleteCard);
createCardForm.addEventListener('submit', sumbitNewCardOptions);

enableValidation(validationConfig);
initializeProfileAndCards();
