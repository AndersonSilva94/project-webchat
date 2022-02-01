const getDateAndHour = require('../utils/getDateAndHour');

const chatSocket = (server) => {
  server.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      // console.log(chatMessage, nickname);
      const date = getDateAndHour();
      const userMessage = `${date} - ${nickname}: ${chatMessage}`;
      // console.log(userMessage);
      server.emit('message', userMessage);
    });
  });
};

module.exports = chatSocket;
