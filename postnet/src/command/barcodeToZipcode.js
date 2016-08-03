let {print} = require('../../src/main.js');

module.exports = function (barcode) {
    let zipcode =  print(barcode);
    if (zipcode.type === false) {
        return {
            error: 'Please give right input'
        }
    } else {
        return {
            text: zipcode,
            reset: true
        }
    }
};
