/**
 * Created by xjy on 8/3/16.
 */
let commandZipCodeToBarcodePage = require("./goto-zipcode-to-barcode-page");
let commandBarcodeToZipCodePage = require("./goto-barcode-to-zipcode-page");
let commandExit = require("./exit");
let commandInvalidInput = require("./invalid-input");
function getMenu() {
  return {
    text:
      `1. Translate zip code to bar code
       2. Translate bar code to zip code
       3. Quit
       Please input your choices(1~3)`,
    newMapping: {
      "1": commandZipCodeToBarcodePage,
      "2": commandBarcodeToZipCodePage,
      "3": commandExit,
      "*": commandInvalidInput
    }
  };
}
 //console.log(getMenu());
 module.exports={
  getMenu:getMenu
};
