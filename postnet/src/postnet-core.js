/**
 * Created by xjy on 8/3/16.
 */
/**
 * Created by xjy on 7/27/16.
 */
"use strict";
let _ = require('lodash');
//字符串检验
function checkZipCode(zipcode) {
  let pattern = /^\d{5}$|^\d{9}$|^\d{5}-\d{4}$/;
  if (pattern.test(zipcode)) {
    return true;
  }
  return false;
}
//得到去掉‘-’的数字串并存入数组
function getReducedArray(zipcode) {
  let result = zipcode.split("");
  if (result.indexOf('-') !== -1) {
    result.splice(5, 1);
  }
  return result;
}
//得到校验码
function getCheckCode(zipcode) {
  let sum = 0;
  sum = zipcode.reduce(((zipcode, num)=> {
    zipcode += parseInt(num);
    return zipcode;
  }), 0);
  let code;
  if (sum % 10 === 0) {
    code = 0;
  }
  else {
    code = 10 - sum % 10;
  }
  return code;
}
//得到最终条码的两步
function getSubCodes(zipcode, allCodes, checkCode) {
  let result = [];
  zipcode.push(checkCode);
  result = zipcode.map((num)=> {
    return allCodes[num];
  });
  return result;
}
function getCodeString(subCodes) {
  let result = subCodes.join('');
  return '|' + result + "|";
}
//邮编转条码的转换函数
function changToCodes(zipcode) {
  let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
  let codeArray = getReducedArray(zipcode);
  let checkCode = getCheckCode(codeArray);
  let subCodes = getSubCodes(codeArray, allCodes, checkCode);
  let codeString = getCodeString(subCodes, checkCode);
  return codeString;
}
//邮编转条码的总函数
function zipCodeToBarcode(zipcode) {
  let checkResult = checkZipCode(zipcode);
  if (checkResult === true) {
    let finalString = changToCodes(zipcode);
    return finalString;
  }
  else {
    return false;
  }
}

/****
 *       no.2
 ****/
//将条码每5位分割存入数组
function splitStringBy5(barcode) {
  return _.chunk(barcode, 5).map((array)=> {
    return array.join("")
  })
}
//检查条码正确性
function checkBarcode(barcode, allCodes) {
  let length = barcode.length;
  let temps = barcode.substr(1, length - 2);
  let inputArray = splitStringBy5(temps);
  let different = (_.difference(inputArray, allCodes));
  let pattern = /^\|[|:]+\|$/;
  if ((length === 32 || length === 52 ) && (pattern.test(barcode)) && different.length === 0) {
    return true;
  } else {
    return false;
  }
}
function getFormatBarCode(barcode, checkNode) {
  let result = '';
  if (checkNode) {
    result = barcode.slice(1, barcode.length - 6);
  }
  return result;
}
function getBarCodesArray(formatBarcode, allCodes) {
  let result = [];
  let barcodes = formatBarcode.split("");
  let splitBarcodes = _.chunk(barcodes, 5);
  splitBarcodes = splitBarcodes.map((element)=> {
    return _.sum(element);
  });
  splitBarcodes.map((code)=> {
    for (let i = 0; i < allCodes.length; i++) {
      if (code === allCodes[i]) {
        result.push(i);
      }
    }
  });
  return result;
}
function getCodeToNumber(numberCodes) {
  let result = '';
  if (numberCodes.length === 9) {
    numberCodes.splice(5, 0, '-');
  }
  result = numberCodes.join("");
  return result;
}
function changeToPostcode(barcode, checkResult, allCodes) {
  let formatBarcode = getFormatBarCode(barcode, checkResult);
  let numberCodes = getBarCodesArray(formatBarcode, allCodes);
  let codeString = getCodeToNumber(numberCodes);
  return codeString;

}
function barcodeToZipCode(barcode) {
  let allCodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
  let checkNode = checkBarcode(barcode, allCodes);
  if (checkNode) {
    let zipcode = changeToPostcode(barcode, checkNode, allCodes);
    return zipcode;
  }
  else {
    return false;
  }
}
module.exports = {
  checkZipCode: checkZipCode,
  getReducedArray: getReducedArray,
  getCheckCode: getCheckCode,
  getSubCodes: getSubCodes,
  getCodeString: getCodeString,
  changToCodes: changToCodes,
  zipCodeToBarcode: zipCodeToBarcode,

  checkBarcode: checkBarcode,
  getFormatBarCode: getFormatBarCode,
  getBarCodesArray: getBarCodesArray,
  getCodeToNumber: getCodeToNumber,
  changeToPostcode: changeToPostcode,
  barcodeToZipCode: barcodeToZipCode,

};
