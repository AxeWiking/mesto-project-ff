import { openModal } from './modal.js'

const popupPreviewDialog = document.querySelector('.popup_type_image');

const defaultCardTitle = "Бермудский треугольник";
const defaultCardLink = "#";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(card, functionDelete = deleteCard, functionLike = likeCard, functionPreview = previewCard) {
  const titleValue = card.name || defaultCardTitle;
  const linkValue = card.link || defaultCardLink;

  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = titleValue;
  cardItem.querySelector('.card__image').src = linkValue;
  cardItem.querySelector('.card__delete-button').addEventListener('click', functionDelete);
  cardItem.querySelector('.card__like-button').addEventListener('click', functionLike);
  cardItem.querySelector('.card__image').addEventListener('click', functionPreview);
  return cardItem;
}

export function deleteCard(event) {
  const cardItem = event.target.closest('.card');
  cardItem.remove();
}

export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export function previewCard(event) {
  const cardItem = event.target.closest('.card');
  const imageSrc = cardItem.querySelector('.card__image').src;
  const description = cardItem.querySelector('.card__title').textContent;
  popupPreviewDialog.querySelector('.popup__image').src = imageSrc;
  popupPreviewDialog.querySelector('.popup__caption').textContent = description;
  openModal(popupPreviewDialog);
}
