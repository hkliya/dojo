/**
 * Created by SONY on 2016/8/3.
 */
let stripMargin = require("stripmargin");
let gotozipcodetobarcode = require("./goto-zipcode-to-barcode");
let gotobarcodetozipcode = require("./goto-barcode-to-zipcode");
let exit = require("./exit")
let invalidinput = require("./invalid-input");

module.exports = function (){
    return {
        text:
            `1.translate zip code to bar code
             2.translate bar code to zip code
             3.Quit
             please input your choice(1-3)`,
        newmapping:{
               "1": gotozipcodetobarcode,
               "2": gotobarcodetozipcode,
               "3": exit,
               "*": invalidinput
        }
    }
}