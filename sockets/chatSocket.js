const getDateAndHour = require('../utils/getDateAndHour');
const getRandomNickname = require('../utils/getRandomNickname');

const listUsers = [];

const chatSocket = (server) => {
  server.on('connection', (socket) => {
    const getNewNickname = getRandomNickname(socket.id);
    const user = {
      nick: getNewNickname,
    };
    listUsers.push(user);
    server.emit('new-connection', listUsers);

    socket.on('message', ({ chatMessage, nickname }) => {
      // console.log(chatMessage, nickname);
      const date = getDateAndHour();
      const userMessage = `${date} - ${nickname}: ${chatMessage}`;
      console.log(socket.id);
      server.emit('message', userMessage);
    });
  });
};

module.exports = chatSocket;
