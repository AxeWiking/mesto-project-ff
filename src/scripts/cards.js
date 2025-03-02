const defaultCardTitle = "Бермудский треугольник";
const defaultCardLink = "#";

export function createCard(card, functionPreview, functionDelete, functionLike) {
  
  const titleValue = card.name || defaultCardTitle;
  const linkValue = card.link || defaultCardLink;

  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardId = cardItem.querySelector('.card__id');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');  

  cardId.textContent = card._id;
  cardTitle.textContent = titleValue;
  if(functionDelete) {
    cardDeleteButton.addEventListener('click', functionDelete);
  } else {
    cardDeleteButton.classList.add('card__delete-button_disabled');
  }
  cardLikeButton.addEventListener('click', functionLike);

  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardImage.addEventListener('click', functionPreview);
  return cardItem;
}

export function getCardId(card) {
  return card.querySelector('.card__id').textContent;
}

export function isRemovableCard(card) {
  return card.querySelector('.card__delete-button_disabled') === null;
}

export function isLikedCard(card) {
  return card.querySelector('.card__like-button_is-active') !== null;
}

export function updateLikeStatus(card, data, profileId) {
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikesNumber = card.querySelector('.card__like-number');
  if(data.likes.find(item => item._id === profileId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active');
  }
  cardLikesNumber.textContent = data.likes.length;
}

