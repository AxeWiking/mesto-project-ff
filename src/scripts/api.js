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

function logApiError(error) {
  console.log(error);
}

function asyncLoadProfile(thenAction) {
  return fetch(apiProfile, { 
      headers: headersConfig
    }
  ).then(responceToJson).then(thenAction).catch(logApiError);
}
 

function asyncLoadCards(thenAction) {
  return fetch(apiCards, {
     headers: headersConfig 
    }
  ).then(responceToJson).then(thenAction).catch(logApiError);
}

export function initialRequest(applayProfile, applyCards) {
  Promise.all([asyncLoadProfile(applayProfile), asyncLoadCards(data => data)])
  .then(results => applyCards(results[1])).catch(logApiError);
}

export function storeProfileRequest(title, description, thenAction, finalAction) {
  fetch(apiProfile, {
      method: 'PATCH',
      headers: headersConfig,
      body: JSON.stringify({
        name: title,
        about: description
      })
    }
  )
  .then(responceToJson).then((data) => thenAction(data.name, data.about))
  .catch(logApiError).finally(finalAction);
}

export function storeAvatarRequest(avatarLink, thenAction, finalAction) {
  fetch(apiProfile + '/avatar', {
      method: 'PATCH',
      headers: headersConfig,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }
  )
  .then(responceToJson).then((data) => thenAction(data.avatar))
  .catch(logApiError).finally(finalAction);
}

export function deleteCardRequest(cardId, thenAction, finalAction) {
  fetch(apiCards + '/' + cardId, {
      method: 'DELETE',
      headers: headersConfig
    }
  )
  .then(responceToJson).then(() => thenAction(cardId))
  .catch(logApiError).finally(finalAction);
}

export function storeCardRequest(placeName, placeLink, thenAction, finalAction) {
  fetch(apiCards, {
      method: 'POST',
      headers: headersConfig,
      body: JSON.stringify({
        name: placeName,
        link: placeLink
      })
    }
  )
  .then(responceToJson).then(thenAction)
  .catch(logApiError).finally(finalAction);
}

export function likeCardRequest(cardId, like, thenAction) {
  fetch(apiCards + '/likes/' + cardId, {
      method: like ? 'PUT' : 'DELETE',
      headers: headersConfig
    }
  )
  .then(responceToJson).then(thenAction).catch(logApiError);
}