const { format } = require('date-fns');

// biblioteca date-fns, encontrada no link: https://date-fns.org/

const getDateAndHour = () => {
  const formatDate = format(new Date(), 'DD-MM-YYYY HH:mm:ss');
  return formatDate;
};

module.exports = getDateAndHour;
