let {zipcodeChangeToBarcode} = require('../../src/best-charge');

module.exports = function (zipcode) {
    let barcode = zipcodeChangeToBarcode(zipcode);

    if(barcode === false) {
        return {
            error: 'Please give right input:'
        };
    }else {
        return {
            text: barcode,
            reset: true
        };
    }
}