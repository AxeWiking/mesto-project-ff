function escapePressHandler(evt) {
  if(evt.key === 'Escape') {
    document.querySelectorAll('.popup').forEach(closeModal);
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', escapePressHandler);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapePressHandler);
}

document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  } else if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
});
