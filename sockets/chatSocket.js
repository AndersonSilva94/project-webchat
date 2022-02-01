const getDateAndHour = require('../utils/getDateAndHour');
const getRandomNickname = require('../utils/getRandomNickname');

const listUsers = [];

const chatSocket = (server) => {
  server.on('connection', (socket) => {
    const getNewNickname = getRandomNickname(socket.id);
    listUsers.push({ nickname: getNewNickname, id: socket.id });
    server.emit('new-connection', listUsers);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = getDateAndHour();
      const userMessage = `${date} - ${nickname}: ${chatMessage}`;
      server.emit('message', userMessage);
    });

    socket.on('change-user', ({ idUser, newNick }) => {
      const findUser = listUsers.findIndex((user) => idUser === user.id);
      console.log(findUser);
      listUsers[findUser].nickname = newNick;
      server.emit('change-user', listUsers);
    });
  });
};

module.exports = chatSocket;
