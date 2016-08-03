"use strict";

let translateBarCodeToBarcode = require('./translateBarcodeToZipCode');

module.exports = function () {
    return {
        text:`please input bar code`,
        newMapping:{"*":translateBarCodeToBarcode}
    }
};