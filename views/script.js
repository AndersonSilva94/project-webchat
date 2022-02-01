const io = window.io();

const buttonMsg = document.getElementById('button-message');
const msg = document.getElementById('message');
const msgs = document.getElementById('messages');
const buttonUser = document.getElementById('button-user');
const user = document.getElementById('username');
const onlineUsers = document.getElementById('online-users');

buttonMsg.addEventListener('click', (e) => {
  e.preventDefault();
  const username = sessionStorage.getItem('user');

  if (msg.value) {
    const msgObj = {
      chatMessage: msg.value,
      username,
    };
    io.emit('message', msgObj);
    msg.value = '';
  }
});

io.on('message', (userMessage) => {
  const newMsg = document.createElement('p');
  newMsg.innerText = userMessage;
  newMsg.style.marginBottom = '10px';
  newMsg.setAttribute('data-testid', 'message');
  msgs.appendChild(newMsg);
});

const createListUsers = (listUser) => {
  onlineUsers.innerHTML = '';
  listUser.forEach((nick) => {
    const newUser = document.createElement('p');
    newUser.innerText = nick;
    newUser.style.marginBottom = '10px';
    newUser.setAttribute('data-testid', 'online-user');
    onlineUsers.appendChild(newUser);
  });
};

io.on('new-connection', ({ listUsers, newUser }) => {
  sessionStorage.setItem('user', newUser);
  createListUsers(listUsers);
});

buttonUser.addEventListener('click', (e) => {
  e.preventDefault();
  const username = sessionStorage.getItem('user');

  if (user.value) {
    const userObj = {
      username,
      newNick: user.value,
    };
    sessionStorage.setItem('user', userObj.newNick);
    io.emit('change-user', userObj);
    user.value = '';
  }
});

io.on('change-user', (listUsers) => {
  createListUsers(listUsers);
});
