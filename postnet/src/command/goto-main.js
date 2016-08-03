// let {mainMenu} = require('../command/goto-main');
let goToZipcodeToBarcode = require('./goToZipcodeToBarcode');
let goToBarcodeToZipcode = require('./goToBarcodeToZipcode');
let exit = require('./exit');
let error = require('./error');
module.exports = function() {
    return {
        text: `
 1. Translate zip code to bar code
2. Translate bar code to zip code
3. Quit
Please input your choices(1~3)`,
        newMapping:{
            "1": goToZipcodeToBarcode,
            "2": goToBarcodeToZipcode,
            "3": exit,
            "*": error
        }
    }
};
