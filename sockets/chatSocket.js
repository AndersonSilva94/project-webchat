const { chatModel } = require('../models');
const getDateAndHour = require('../utils/getDateAndHour');
const getRandomNickname = require('../utils/getRandomNickname');

let listUsers = [];

const message = async (server, nickname, chatMessage) => {
  const date = getDateAndHour();
  await chatModel.createMessage({ message: chatMessage, nickname, timestamp: date });
  const userMessage = `${date} - ${nickname}: ${chatMessage}`;
  server.emit('message', userMessage);
};

const changeUser = 'change-user';

const chatSocket = (server) => {
  server.on('connection', (socket) => {
    const getNewNickname = getRandomNickname(socket.id);
    listUsers.push({ nickname: getNewNickname, id: socket.id });
    server.emit('new-connection', listUsers);

    socket.on('message', async ({ chatMessage, nickname }) => {
      await message(server, nickname, chatMessage);
    });

    socket.on(changeUser, ({ idUser, newNick }) => {
      const findUser = listUsers.findIndex((user) => idUser === user.id);
      listUsers[findUser].nickname = newNick;
      server.emit(changeUser, listUsers);
    });
    
    socket.on('disconnect', () => {
      listUsers = listUsers.filter(({ id }) => id !== socket.id);
      server.emit(changeUser, listUsers);
    });
  });
};

module.exports = chatSocket;
