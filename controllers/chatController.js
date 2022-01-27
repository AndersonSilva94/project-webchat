const getAll = async (request, response) => {
  try {
    const { chatMessage, nickname } = request.body;

    response.status(200).render('chatView', { chatMessage, nickname });
  } catch (err) {
    console.log(err);
    response.status(500).render('chatView', { message: 'Erro no servidor' });
  }
};

module.exports = {
  getAll,
};
