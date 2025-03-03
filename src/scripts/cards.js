const defaultCardTitle = "Бермудский треугольник";
const defaultCardLink = "#";

export function createCard(cardInfo, functionPreview, functionDelete, functionLike) {
  const titleValue = cardInfo.name || defaultCardTitle;
  const linkValue = cardInfo.link || defaultCardLink;

  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');  

  cardTitle.textContent = titleValue;
  if(functionDelete) {
    cardDeleteButton.addEventListener('click', function (event) {
      functionDelete(card, cardInfo._id);
    });
  } else {
    cardDeleteButton.classList.add('card__delete-button_disabled');
  }
  cardLikeButton.addEventListener('click', function (event) {
    functionLike(card, cardInfo._id);
  });

  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  cardImage.addEventListener('click', function (event) {
    functionPreview(cardImage.src, cardImage.alt, cardTitle.textContent);
  });
  return card;
}

export function isLikedCard(card) {
  return card.querySelector('.card__like-button_is-active') !== null;
}

export function updateLikeStatus(card, cardInfo, profileId) {
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikesNumber = card.querySelector('.card__like-number');
  if(cardInfo.likes.find(item => item._id === profileId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active');
  }
  cardLikesNumber.textContent = cardInfo.likes.length;
}

