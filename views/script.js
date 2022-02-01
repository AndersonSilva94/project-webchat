const io = window.io();

const buttonMsg = document.getElementById('button-message');
const msg = document.getElementById('message');
// const buttonUser = document.getElementById('button-user');
const user = document.getElementById('username');

buttonMsg.addEventListener('click', (e) => {
  e.preventDefault();

  if (msg.value) {
    const msgObj = {
      chatMessage: msg.value,
      nickname: user.value,
    };

    io.emit('message', msgObj);
    user.value = '';
    msg.value = '';
  }
});