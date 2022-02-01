const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const getMessages = db.collection('messages').find().toArray();
  return getMessages;
};

module.exports = {
  getAll,
};
