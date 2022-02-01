const { format } = require('date-fns');

// biblioteca date-fns, encontrada no link: https://date-fns.org/

const getDateAndHour = () => {
  const formatDate = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  return formatDate;
};

module.exports = getDateAndHour;
