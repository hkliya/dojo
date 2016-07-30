let _ = require("lodash");
let {loadAllCode} = require('../src/codes');
"use strict";
function barcodeToZipCode(barcode) {
    let allCodes = loadAllCode();
    let formattedBarcode = formatCheckedBarcode(barcode);
    if (formattedBarcode.text != '邮编不合法') {
        let barcodeArray = transformBarCodes(formattedBarcode, allCodes);
        return {text: buildZipCodeString(barcodeArray), type: true};
    } else {
        return formattedBarcode;
    }
}
function formatCheckedBarcode(barcode) {
    let checked = _checkBarcode(barcode);
    if (checked.text == '邮编不合法') {
        return checked;
    }
    return checked.text.split("");
}
function _checkBarcode(barcode) {
    let exp5 = /^\d{5}$/;
    let exp9 = /^\d{9}$/;
    let exp10 = /^\d{5}\-\d{4}$/;
    if (exp5.test(barcode)) {
        return {text: barcode, type: true};
    } else if (exp9.test(barcode)) {
        return {text: barcode, type: true};
    } else if (exp10.test(barcode)) {
        return {text: _.camelCase(barcode), type: true};
    } else {
        return {text: '邮编不合法', type: false};
    }
}
function transformBarCodes(formattedBarcode, allCodes) {
    let CD = _calculateCD(formattedBarcode);
    return _transformBarcode(CD, formattedBarcode, allCodes);
}
function _calculateCD(formattedBarcode) {
    let total = 0;
    let CD;
    formattedBarcode.map(temp => total += parseInt(temp));
    if (total % 10) {
        CD = 10 - total % 10;
    } else {
        CD = 0;
    }
    return CD.toString();
}
function _transformBarcode(CD, formattedBarcode, allCodes) {
    formattedBarcode.push(CD);
    return formattedBarcode.map(formatted => {
        let temp = allCodes.find(temp => formatted == temp.No);
        return {No: temp.No, code: temp.code};
    });
}
function buildZipCodeString(barcodeArray) {
    let string = '|';
    barcodeArray.map(temp => string += temp.code);
    string += '|';
    return string;
}
function zipCodeToBarcode(zipCode) {
    //判断合法性
    if(zipCode.length !== 32 && zipCode.length !== 52){
        return {text: '不合法', type: false}
    }
    if(zipCode.split("").some((t)=>{
        if(t !== ':' &&t!=='|')return true;
    })){
        return {text: '不合法', type: false}
    }
    //对合法zipCode进行操作
    let allCodes = loadAllCode();
    let formattedZipCodes = formatZipCode(zipCode,allCodes);
    if(formattedZipCodes.text == '不合法'){
        return formattedZipCodes;
    }
    let zipCodes = transformZipCode(formattedZipCodes.text, allCodes);
    let checkedZipCode = checkCD(zipCodes);
    if (checkedZipCode.text != '不合法') {
        return {text: buildPostcodeString(checkedZipCode), type: true};
    } else {
        return checkedZipCode;
    }
}
function _exit(array1,array2) {
    for(let temp of array1){
        // for(let item of array2){
        //     if(temp == item)
        //         return true;
        // }
        return array2.some(item=>item == temp);
        //return false;
    }
}
function formatZipCode(zipCode,allCodes) {
    let string = zipCode.substring(1,zipCode.length-1);
    let zipCodeArray = string.split("");
    zipCodeArray = _.chunk(zipCodeArray,5);
    // if(_exit(zipCodeArray,allCodes) == false){
    //     return {text: '不合法', type: false}
    // }
    // //console.log(_exit(zipCodeArray,allCodes));
    return {text: zipCodeArray.map(temp => {return temp.join("")}),type:true}
}
function transformZipCode(formattedZipCodes, allCodes) {
    return formattedZipCodes.map((formatZipCode)=> {
        let temp = allCodes.find(temp => formatZipCode == temp.code);
        return {No: temp.No, code: temp.code};
    });
}
function checkCD(zipCodes) {
    let total = 0;
    zipCodes.map(temp => total += parseInt(temp.No));
    if (total % 10 == 0) {
        zipCodes.pop();
        return zipCodes;
    } else {
        return {text: '不合法', type: false}
    }
}
function buildPostcodeString(checkedZipCode) {
    let arr = checkedZipCode.map(temp => {
        return temp.No
    });
    if (arr.length == 9) {
        arr.splice(5, 0, '-');
    }
    return arr.join("");
}
module.exports = {
    barcodeToZipCode: barcodeToZipCode,
    formatCheckedBarcode: formatCheckedBarcode,
    transformBarCodes: transformBarCodes,
    buildZipCodeString: buildZipCodeString,
    formatZipCode: formatZipCode,
    transformZipCode: transformZipCode,
    checkCD: checkCD,
    buildPostcodeString: buildPostcodeString,
    zipCodeToBarcode: zipCodeToBarcode
};