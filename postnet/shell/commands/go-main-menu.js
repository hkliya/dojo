//
let commandZipcodeToBarcode = require('./go-zipcode-to-barcode');
let commandBarcodeToZipcode = require('./go-barcode-to-zipcode');
let commandQuit = require('./quit');
let commandErrorInput = require('./error-input');

module.exports = function () {
    return {
        text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
        newMapping: {
            '1': commandZipcodeToBarcode,
            '2': commandBarcodeToZipcode,
            '3': commandQuit,
            '*': commandErrorInput
        }
    };
};