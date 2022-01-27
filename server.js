// Faça seu código aqui
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const chatSocket = require('./sockets/chatSocket');
const { chatController } = require('./controllers');

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

const cors = {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
};

const server = socket(httpServer, cors);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', chatController.getAll);

chatSocket(server);

httpServer.listen(PORT, () => {
  console.log(`ouvindo porta ${PORT}!`);
});
