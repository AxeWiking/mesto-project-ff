function closeModalHandlerByEscape(evt) {
  if(evt.key === 'Escape') {
    const popups = document.querySelectorAll('.popup');
    const openedPopup = popups.find(item => item.classList.contains('popup_is-opened'));
    if(openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalHandlerByEscape);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalHandlerByEscape);
}

export function closeModalHandlerByClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  } else if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}
