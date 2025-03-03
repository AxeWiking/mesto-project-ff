const apiProfile = 'https://nomoreparties.co/v1/wff-cohort-33/users/me';
const apiCards = 'https://nomoreparties.co/v1/wff-cohort-33/cards';
const token = '5c2cc4ae-2520-4cde-8c38-e0754b178a69';

const headersConfig = {
  authorization: token,
  'Content-Type': 'application/json'
};

function responceToJson(responce) {
  if (responce.ok) {
    return responce.json();
  }
  return Promise.reject(`Ошибка: ${responce.status}`);
}

export function logApiError(error) {
  console.log(error);
}

export function loadProfile() {
  return fetch(apiProfile, { 
      headers: headersConfig
    }
  ).then(responceToJson);
}
 
export function loadCards() {
  return fetch(apiCards, {
     headers: headersConfig 
    }
  ).then(responceToJson);
}

export function storeProfile(title, description) {
  return fetch(apiProfile, {
      method: 'PATCH',
      headers: headersConfig,
      body: JSON.stringify({
        name: title,
        about: description
      })
    }
  ).then(responceToJson);
}

export function storeAvatar(avatarLink) {
  return fetch(apiProfile + '/avatar', {
      method: 'PATCH',
      headers: headersConfig,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }
  ).then(responceToJson);
}

export function deleteCard(cardId) {
  return fetch(apiCards + '/' + cardId, {
      method: 'DELETE',
      headers: headersConfig
    }
  ).then(responceToJson);
}

export function storeCard(placeName, placeLink) {
  return fetch(apiCards, {
      method: 'POST',
      headers: headersConfig,
      body: JSON.stringify({
        name: placeName,
        link: placeLink
      })
    }
  ).then(responceToJson);
}

export function likeCard(cardId, like) {
  return fetch(apiCards + '/likes/' + cardId, {
      method: like ? 'PUT' : 'DELETE',
      headers: headersConfig
    }
  ).then(responceToJson);
}