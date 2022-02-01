const getAll = async (request, response) => {
  try {
    response.status(200).render('chatView');
  } catch (err) {
    console.log(err);
    response.status(500).render('chatView', { message: 'Erro no servidor' });
  }
};

module.exports = {
  getAll,
};
