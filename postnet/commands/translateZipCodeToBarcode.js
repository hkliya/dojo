"use strict";

let core = require('../src/core');

module.exports = function (input) {
    let barcode = core.zipCodeToBarcode(input);
    if(barcode.type === false){
        return {
            error:`please give right input:`
        }
    }else{
        return {
            text:barcode.text,
            reset:true
        }
    }
};