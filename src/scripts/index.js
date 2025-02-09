import '../pages/index.css';
import { openModal, closeModal, closeModalHandlerByClick } from './modal.js'
import { initialCards, createCard, deleteCard, likeCard } from './cards.js'

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileEditButton = content.querySelector('.profile__edit-button');
const createCardButton = content.querySelector('.profile__add-button');
const profileTitleItem = content.querySelector('.profile__title');
const profileDescriptionItem = content.querySelector('.profile__description');

const editProfileDialog = document.querySelector('.popup_type_edit');
const newCardDialog = document.querySelector('.popup_type_new-card');
const previewDialog = document.querySelector('.popup_type_image');
const previewDialogImage = previewDialog.querySelector('.popup__image');
const previewDialogCaption = previewDialog.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const createCardForm = document.forms['new-place'];

initialCards.forEach((item) => {
  const cardElement = createCard(item, previewCard);
  placesList.append(cardElement);
});

function openPopupProfile(evt) {
  editProfileForm.elements.name.value = profileTitleItem.textContent;
  editProfileForm.elements.description.value = profileDescriptionItem.textContent;
  openModal(editProfileDialog);
}

function sumbitPopupProfile(evt) {
  evt.preventDefault();
  profileTitleItem.textContent = editProfileForm.elements.name.value;
  profileDescriptionItem.textContent = editProfileForm.elements.description.value;
  closeModal(editProfileDialog);
}

function openNewCardOptions(evt) {
  openModal(newCardDialog);
}

function previewCard(event) {
  const cardItem = event.target.closest('.card');
  const cardImage = cardItem.querySelector('.card__image');
  const cardDescription = cardItem.querySelector('.card__title');
  previewDialogImage.src = cardImage.src;
  previewDialogImage.alt = cardImage.alt;
  previewDialogCaption.textContent = cardDescription.textContent;
  openModal(previewDialog);
}

function sumbitNewCardOptions(evt) {
  evt.preventDefault();
  const placeName = createCardForm.elements['place-name'].value;
  const placeLink = createCardForm.elements.link.value;
  if(placeName && placeLink) {
    const cardElement = createCard({ name: placeName, link: placeLink }, previewCard);
    placesList.prepend(cardElement);
    closeModal(newCardDialog);
    createCardForm.reset();
  }
}

document.addEventListener('click', closeModalHandlerByClick);
profileEditButton.addEventListener('click', openPopupProfile);
createCardButton.addEventListener('click', openNewCardOptions);

editProfileForm.addEventListener('submit', sumbitPopupProfile);
createCardForm.addEventListener('submit', sumbitNewCardOptions);

