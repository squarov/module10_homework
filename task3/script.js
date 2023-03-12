let template = document.querySelector('#message-template').content;
let templateBlock = template.querySelector('.chat-message');
let messagesList = document.querySelector('.chat-content');
let messageSubmit = document.querySelector('.chat-form-button');
let messageInput = document.querySelector('.chat-form-input');
let geoSend = document.querySelector('.geo');

let removeMessage = (message) => {
  let deleteButton = message.querySelector('.chat-message-button');
  deleteButton.addEventListener('click', () => {
    message.remove();
  });
}

messageSubmit.addEventListener('click', () => {
  let newMessageBlock = templateBlock.cloneNode(true);
  let newMessageText = newMessageBlock.querySelector('.chat-message-text');
  newMessageText.textContent = messageInput.value;
  // newMessageBlock.style.width = newMessageText.textContent.length + 'px';
  // newMessageText.style.width = messageInput.value.length + 'px';
  messagesList.appendChild(newMessageBlock);
  messageInput.value = '';
  removeMessage(newMessageBlock);
});

messageInput.addEventListener("input", (event) => {
  if(!event.target.value) {
    messageSubmit.setAttribute("disabled", '');
  } else {
    messageSubmit.removeAttribute("disabled");
  }
});

geoSend.addEventListener('click', () => {
  let newMessageBlock = templateBlock.cloneNode(true);
  let mapLink = document.createElement('a');
  let newMessageText = newMessageBlock.querySelector('.chat-message-text');

  const error = () => {
    newMessageText.textContent = 'Невозможно получить ваше местоположение';
  }

  const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    newMessageText.replaceWith(mapLink);
    mapLink.classList.add('chat-message-text');
    mapLink.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  }
  
  mapLink.href = '';
  mapLink.textContent = '';
  if (!navigator.geolocation) {
    newMessageText.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    newMessageText.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

  messagesList.appendChild(newMessageBlock);
  removeMessage(newMessageBlock);
});