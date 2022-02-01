const getRandomNickname = (id) => {
  const newNickname = id.slice(0, 16);
  return newNickname;
};

module.exports = getRandomNickname;