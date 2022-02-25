var moment = require('moment')

var getFormattedDate = function getFormattedDate(date, format) {
    return moment(date).format(format);
}

var getDefaultFormattedDate = function getDefaultFormattedDate(date) {
    return this.getFormattedDate(date, 'YYYY-MM-DD');
}

var getDefaultLongFormattedDate = function getDefaultLongFormattedDate(date) {
    return this.getFormattedDate(date, 'YYYY-MM-DD HH:mm:ss');
}

var getLocalDateFromDefaultFormat = function getLocalDateFromDefaultFormat(dateStr) {
    return this.getLocalDateFromString(dateStr, 'YYYY-MM-DD');
}

module.exports = {
    getFormattedDate:getFormattedDate,  
    getDefaultFormattedDate:getDefaultFormattedDate,
    getDefaultLongFormattedDate:getDefaultLongFormattedDate,
    getLocalDateFromDefaultFormat:getLocalDateFromDefaultFormat
}