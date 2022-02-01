const getDateAndHour = require('../utils/getDateAndHour');
const getRandomNickname = require('../utils/getRandomNickname');

const listUsers = [];

const chatSocket = (server) => {
  server.on('connection', (socket) => {
    const getNewNickname = getRandomNickname(socket.id);
    listUsers.push(getNewNickname);
    server.emit('new-connection', { listUsers, newUser: getNewNickname });

    socket.on('message', ({ chatMessage, username }) => {
      const date = getDateAndHour();
      const userMessage = `${date} - ${username}: ${chatMessage}`;
      server.emit('message', userMessage);
    });

    socket.on('change-user', ({ username, newNick }) => {
      const findUser = listUsers.findIndex((user) => username === user);
      listUsers[findUser] = newNick;
      server.emit('change-user', listUsers);
    });
  });
};

module.exports = chatSocket;
