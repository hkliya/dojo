"use strict";

let goToZipCode = require('./goToZipCode');
let goToBarcode = require('./goToBarcode');
let exit = require('./exit');
let evalInput = require('./evalInput');

module.exports = function () {
    return {
        text: `1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
        newMapping: {
            "1": goToZipCode,
            "2": goToBarcode,
            "3": exit,
            "*": evalInput
        }
    };
};