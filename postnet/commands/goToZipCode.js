let translateZipCodeToBarcode = require('./translateZipCodeToBarcode');

module.exports = function () {
    return {
        text:`please input zip code:`,
        newMapping:{"*":translateZipCodeToBarcode}
    }
};

