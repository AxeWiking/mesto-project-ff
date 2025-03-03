(()=>{"use strict";function t(t,r){var i=Array.from(t.querySelectorAll(r.inputSelector));i.forEach((function(n){return function(t,n,o){n.setCustomValidity(""),e(t,n,o)}(t,n,r)})),o(t,r),i.forEach((function(e){n(t,e,r)}))}function e(t,e,n){var o=t.querySelector(".popup__".concat(e.name,"_input-error"));e.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function n(t,n,o){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?e(t,n,o):function(t,e,n,o){var r=t.querySelector(".popup__".concat(e.name,"_input-error"));e.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(t,n,n.validationMessage,o)}function o(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);!function(t){return t.some((function(t){return!t.validity.valid}))}(n)?(o.disabled=!1,o.classList.remove(e.inactiveButtonClass)):(o.disabled=!0,o.classList.add(e.inactiveButtonClass))}function r(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&a(e)}}function i(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function a(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function c(t,e,n,o){var r=t.name||"Бермудский треугольник",i=t.link||"#",a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=a.querySelector(".card__image"),u=a.querySelector(".card__title"),s=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button");return u.textContent=r,n?s.addEventListener("click",(function(e){n(a,t._id)})):s.classList.add("card__delete-button_disabled"),l.addEventListener("click",(function(e){o(a,t._id)})),c.src=i,c.alt=r,c.addEventListener("click",(function(t){e(c.src,c.alt,u.textContent)})),a}function u(t,e,n){var o=t.querySelector(".card__like-button"),r=t.querySelector(".card__like-number");e.likes.find((function(t){return t._id===n}))?o.classList.add("card__like-button_is-active"):o.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length}var s="https://nomoreparties.co/v1/wff-cohort-33/users/me",l="https://nomoreparties.co/v1/wff-cohort-33/cards",d={authorization:"5c2cc4ae-2520-4cde-8c38-e0754b178a69","Content-Type":"application/json"};function p(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}function f(t){console.log(t)}var m=document.querySelector(".content"),_=m.querySelector(".places__list"),v=m.querySelector(".profile__edit-button"),y=m.querySelector(".profile__add-button"),h=m.querySelector(".profile__id"),b=m.querySelector(".profile__title"),C=m.querySelector(".profile__description"),S=m.querySelector(".profile__image"),q=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_edit-avatar"),x=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_delete-card"),k=document.querySelector(".popup_type_image"),g=k.querySelector(".popup__image"),A=k.querySelector(".popup__caption"),T=document.forms["edit-profile"],w=document.forms["edit-avatar"],D=document.forms["remove-place"],P=document.forms["new-place"],B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function N(t,e,n){g.src=t,g.alt=e,A.textContent=n,i(k)}function O(t,e){(function(t,e){return fetch(l+"/likes/"+t,{method:e?"PUT":"DELETE",headers:d}).then(p)})(e,!function(t){return null!==t.querySelector(".card__like-button_is-active")}(t)).then((function(e){return u(t,e,h.textContent)})).catch(f)}var j,J=null;function M(t,e){J={Card:t,CardId:e},i(E)}document.addEventListener("click",(function(t){t.target.classList.contains("popup__close")?a(t.target.closest(".popup")):t.target.classList.contains("popup")&&a(t.target)})),v.addEventListener("click",(function(){T.reset(),T.elements.name.value=b.textContent,T.elements.description.value=C.textContent,t(T,B),i(q)})),S.addEventListener("click",(function(){w.reset();var e=S.style["background-image"];/^URL\([\"\'].+[\"\']\)$/i.test(e)&&(w.elements.link.value=e.slice(5,e.length-2)),t(w,B),i(L)})),y.addEventListener("click",(function(){P.reset(),t(P,B),i(x)})),T.addEventListener("submit",(function(t){t.preventDefault();var e,n,o=T.submit.textContent;T.submit.textContent=T.submit.dataset.operation,(e=T.elements.name.value,n=T.elements.description.value,fetch(s,{method:"PATCH",headers:d,body:JSON.stringify({name:e,about:n})}).then(p)).then((function(t){b.textContent=t.name,C.textContent=t.about,a(q)})).catch(f).finally((function(){T.submit.textContent=o}))})),w.addEventListener("submit",(function(t){t.preventDefault();var e,n=w.submit.textContent;w.submit.textContent=w.submit.dataset.operation,(e=w.elements.link.value,fetch(s+"/avatar",{method:"PATCH",headers:d,body:JSON.stringify({avatar:e})}).then(p)).then((function(t){S.style["background-image"]='url("'+t.avatar+'")',a(L)})).catch(f).finally((function(){w.submit.textContent=n}))})),D.addEventListener("submit",(function(t){if(t.preventDefault(),J){var e=J.CardId,n=D.submit.textContent;D.submit.textContent=D.submit.dataset.operation,function(t){return fetch(l+"/"+t,{method:"DELETE",headers:d}).then(p)}(e).then((function(){J&&(J.Card.remove(),J=null),a(E)})).catch(f).finally((function(){D.submit.textContent=n}))}})),P.addEventListener("submit",(function(t){t.preventDefault();var e,n,o=P.submit.textContent;P.submit.textContent=P.submit.dataset.operation,(e=P.elements["place-name"].value,n=P.elements.link.value,fetch(l,{method:"POST",headers:d,body:JSON.stringify({name:e,link:n})}).then(p)).then((function(t){var e=c(t,N,M,O);u(e,t,h.textContent),_.prepend(e),a(x)})).catch(f).finally((function(){P.submit.textContent=o}))})),j=B,Array.from(document.querySelectorAll(j.formSelector)).forEach((function(t){return function(t,e){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(t){t.addEventListener("input",(function(t){var r=t.target.closest(e.formSelector);n(r,t.currentTarget,e),o(r,e)}))}))}(t,j)})),Promise.all([fetch(s,{headers:d}).then(p).then((function(t){h.textContent=t._id,b.textContent=t.name,C.textContent=t.about,S.style["background-image"]="url(".concat(t.avatar,")")})),fetch(l,{headers:d}).then(p)]).then((function(t){t[1].forEach((function(t){var e=c(t,N,h.textContent===t.owner._id?M:null,O);u(e,t,h.textContent),_.append(e)}))})).catch(f)})();