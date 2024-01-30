var moment = require("moment");

const helper = {
  addCommasToNumber: function (number) {
    const convertNumber =
      number > 0
        ? number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : number;

    return convertNumber + "₫";
  },
  formatDateTime: function (dateString) {
    return dateString ? moment(dateString).format("DD/MM/YYYY • HH:mm:ss") : "";
  },
  formatDateTime: function (dateString) {
    return dateString ? moment(dateString).format("DD/MM/YYYY • HH:mm:ss") : "";
  },
  getDaysFromNow: function (dateString) {
    return dateString ? moment(dateString).fromNow() : "";
  },
  removeAccents: function (str) {
    const AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
      const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      const char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  },
};

module.exports = { helper };
