const defaultCardTitle = "Бермудский треугольник";
const defaultCardLink = "#";

const content = document.querySelector('.content');
const places = content.querySelector('.places');

function createCard(card, functionDelete = deleteCard) {
  const titleValue = card.name || defaultCardTitle;
  const linkValue = card.link || defaultCardLink;

  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = titleValue;
  cardItem.querySelector('.card__image').src = linkValue;
  cardItem.querySelector('.card__delete-button').addEventListener('click', functionDelete);

  return cardItem;
}

function deleteCard(event) {
  const cardItem = event.target.closest('.card');
  cardItem.remove();
}

initialCards.forEach((item) => {
  const cardElement = createCard(item, deleteCard);
  places.querySelector('.places__list').append(cardElement);
});
