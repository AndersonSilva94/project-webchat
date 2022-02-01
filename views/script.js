const io = window.io();

const buttonMsg = document.getElementById('button-message');
const msg = document.getElementById('message');
// const buttonUser = document.getElementById('button-user');
const user = document.getElementById('username');
const onlineUsers = document.getElementById('online-users');

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

io.on('new-connection', (listUser) => {
  onlineUsers.innerHTML = '';
  listUser.forEach(({ nick }) => {
    const newUser = document.createElement('p');
    newUser.innerText = nick;
    newUser.style.marginBottom = '10px';
    newUser.setAttribute('data-testid', 'online-user');
    onlineUsers.appendChild(newUser);
  });
});