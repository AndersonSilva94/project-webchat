const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const getMessages = await db.collection('messages').find().toArray();
  return getMessages;
};

const createMessage = async (message, nickname, timestamp) => {
  const db = await connection();
  await db.collection('messages').insertOne({
    message,
    nickname,
    timestamp,
  });
};

module.exports = {
  getAll,
  createMessage,
};
