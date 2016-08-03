"use strict";

let core = require('../src/core');

module.exports = function (input) {
    let zipCode = core.barcodeToZipCode(input);
    if(zipCode.type === false){
        return {
            error:`please give right input:`
        }
    }else{
        return {
            text:zipCode.text,
            reset:true
        }
    }
};