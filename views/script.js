const io = window.io();

const buttonMsg = document.getElementById('button-message');
const msg = document.getElementById('message');
const msgs = document.getElementById('messages');
const buttonUser = document.getElementById('button-user');
const user = document.getElementById('username');
const onlineUsers = document.getElementById('online-users');
let nickUser = '';

buttonMsg.addEventListener('click', (e) => {
  e.preventDefault();

  if (msg.value) {
    const msgObj = {
      chatMessage: msg.value,
      nickname: nickUser,
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

const createActiveUser = (nick) => {
  const newUser = document.createElement('p');
  newUser.innerText = nick;
  newUser.style.marginBottom = '10px';
  newUser.setAttribute('data-testid', 'online-user');
  return newUser;
};

const createListUsers = (listUser) => {
  onlineUsers.innerHTML = '';
  listUser.forEach(({ id, nickname }) => {
      if (id === io.id) {
        onlineUsers.prepend(createActiveUser(nickname));
        sessionStorage.setItem('user', id);
        nickUser = nickname;
      } else {
        onlineUsers.appendChild(createActiveUser(nickname));
      }
  });
};

io.on('new-connection', (listUsers) => {
  createListUsers(listUsers);
});

buttonUser.addEventListener('click', (e) => {
  e.preventDefault();
  const idUser = sessionStorage.getItem('user');

  if (user.value) {
    const userObj = {
      idUser,
      newNick: user.value,
    };
    io.emit('change-user', userObj);
    user.value = '';
  }
});

io.on('change-user', (listUsers) => {
  createListUsers(listUsers);
});
