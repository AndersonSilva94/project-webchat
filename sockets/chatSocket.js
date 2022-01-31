const getDateAndHour = require('../utils/getDateAndHour');

const chatSocket = (server) => {
  server.on('connection', (socket) => {
    socket.on('message', async ({ chatMessage, nickname }) => {
      const date = await getDateAndHour();
      const userMessage = `${date} - ${nickname}: ${chatMessage}`;
      server.emit('responseServer', userMessage);
    });
  });
};

module.exports = chatSocket;