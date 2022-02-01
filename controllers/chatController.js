const { chatModel } = require('../models');

const getAll = async (_request, response) => {
  try {
    const getMessages = await chatModel.getAll();
    response.status(200).render('chatView', { messages: getMessages });
  } catch (err) {
    console.log(err);
    response.status(500).render('chatView', { message: 'Erro no servidor' });
  }
};

module.exports = {
  getAll,
};
