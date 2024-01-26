var moment = require("moment");

const helper = {
  addCommasToNumber: function (number) {
    const convertNumber = number > 0
      ? number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : number;

      return convertNumber + '₫'
  },
  formatDateTime: function (dateString) {
    return dateString ? moment(dateString).format('DD/MM/YYYY • HH:mm:ss') : ''
  },
};

module.exports = { helper };