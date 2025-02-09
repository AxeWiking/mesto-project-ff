import '../pages/index.css';
import { openModal, closeModal } from './modal.js'
import { initialCards, createCard, deleteCard, likeCard, previewCard } from './cards.js'

const content = document.querySelector('.content');
const places = content.querySelector('.places');
const profileEditButton = content.querySelector('.profile__edit-button');
const createCardButton = content.querySelector('.profile__add-button');
const profileTitleItem = content.querySelector('.profile__title');
const profileDescriptionItem = content.querySelector('.profile__description');

const editProfileDialog = document.querySelector('.popup_type_edit');
const newCardDialog = document.querySelector('.popup_type_new-card');

const editProfileForm = document.forms['edit-profile'];
const createCardForm = document.forms['new-place'];

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  places.querySelector('.places__list').append(cardElement);
});

profileEditButton.addEventListener('click', function (evt) {
  editProfileForm.elements.name.value = profileTitleItem.textContent;
  editProfileForm.elements.description.value = profileDescriptionItem.textContent;
  openModal(editProfileDialog);
});

editProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitleItem.textContent = editProfileForm.elements.name.value;
  profileDescriptionItem.textContent = editProfileForm.elements.description.value;
  closeModal(editProfileDialog);
});

createCardButton.addEventListener('click', function (evt) {
  openModal(newCardDialog);
});

createCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const placeName = createCardForm.elements['place-name'].value;
  const placeLink = createCardForm.elements.link.value;
  if(placeName && placeLink) {
    const cardElement = createCard({ name: placeName, link: placeLink });
    places.querySelector('.places__list').prepend(cardElement);
    closeModal(newCardDialog);
    createCardForm.reset();
  }
});

