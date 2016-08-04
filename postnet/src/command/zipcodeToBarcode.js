let {finialPostcode} = require('../../src/main.js');

module.exports = function (zipcode) {
    let barcode = finialPostcode(zipcode);
    if (barcode.type === false) {
        return {
            error: 'Please give right input',
        }
    } else {
        return {
            text: barcode,
            reset: true
        }
    }
};