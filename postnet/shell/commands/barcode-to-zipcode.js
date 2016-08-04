let {barcodeChangeToZipcode} = require('../../src/best-charge');

module.exports = function (barcode) {
    let zipcode = barcodeChangeToZipcode(barcode);

    if(zipcode === false) {
        return {
            error: 'Please give right input:'
        };
    }else {
        return {
            text: zipcode,
            reset: true
        };
    }

}