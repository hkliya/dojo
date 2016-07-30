/*global _, require,  module*/

let _ = require('lodash');

function loadAllCodes() {
    return [
        '||:::',
        ':::||',
        '::|:|',
        '::||:',
        ':|::|',
        ':|:|:',
        ':||::',
        '|:::|',
        '|::|:',
        '|:|::'
    ];
}

function splitStringBy5(barcode) {
    return _.chunk(barcode, 5).map((array) =>{
        return array.join('');
    });
}

function checkBarcode(barcode, allCodes) {
    let length = barcode.length;
    let isTrueBarcode = false;

    if ((length === 32 || length === 52) && barcode[0] === '|' && barcode[length - 1] === '|') {
        let temp = barcode.substr(1, length - 2);
        temp = splitStringBy5(temp);
        let result = temp.map((code) => {
            return allCodes.indexOf(code);
        });

        if (result.includes(-1) === false){
            console.log(result.includes(-1));
            isTrueBarcode = true;
        }
    }

    return {
        isTrueBarcode,
        barcode
    };
}

function formatBarcode({isTrueBarcode, barcode}, allCodes) {
    let trueBarcode = false;
    let codes = [];
    if (isTrueBarcode === true) {
        barcode = barcode.substr(1, barcode.length - 2);
        codes = splitStringBy5(barcode);

        let temp = codes.map((code) => {
            return allCodes.indexOf(code);
        });

        if (!temp.includes(-1))
            trueBarcode = true;
    }
    return {
        isTrueBarcode: trueBarcode,
        barcode: codes
    };
}

function checkBarcodeCd({isTrueBarcode, barcode}, allCodes) {
    let trueBarcode = false;
    let codes = [];
    if (isTrueBarcode === true) {
        codes = barcode.map((element) => {
            return allCodes.indexOf(element);
        });
        if (_.sum(codes) % 10 === 0)
            trueBarcode = true;
        codes = _.dropRight(codes);
    }
    return {
        isTrueBarcode: trueBarcode,
        barcode: codes
    }
}

function changeToPostcode({isTrueBarcode, barcode}) {
    if (isTrueBarcode === true) {
        if (barcode.length === 9)
            barcode.splice(5, 0, '-');
        return barcode.join('');
    }
    return 'Please enter the correct barcode';
}

function barcodeChangeToPostcode(barcode, allCodes) {
    let checkedBarcode = checkBarcode(barcode, allCodes);
    let formatedBarcode = formatBarcode(checkedBarcode, allCodes);
    let checkedBarcodeCd = checkBarcodeCd(formatedBarcode, allCodes);

    return changeToPostcode(checkedBarcodeCd);
}

function checkPostcode(postcode) {
    let isTruePostcode = false;

    if ((postcode.length === 5 || postcode.length === 9 ) || (postcode.length === 10 && postcode[5] === '-')) {
        postcode = postcode.length === 10 ? postcode.substr(0, 5) + postcode.substr(6) : postcode;

        let re = /^[0-9]*$/;
        if (postcode.match(re) && postcode === postcode.match(re)[0])
            isTruePostcode = true;
    }

    return {
        isTruePostcode,
        postcode
    };
}

function chageToBarcode({isTruePostcode, postcode}, allCodes) {
    if (isTruePostcode === true) {
        postcode = postcode.length === 10 ? postcode.substr(0, 5) + postcode.substr(6) : postcode;
        let temp = postcode.split('');
        let sum = temp.reduce((result, element) => {
            result += parseInt(element);
            return result;
        }, 0);

        let cd = sum % 10 === 0 ? 0 : 10 - sum % 10;
        temp.push(cd);
        postcode = temp.map((element) => {
            return allCodes[parseInt(element)];
        });

        return '|' + postcode.join('') + '|';
    }
    return 'Please enter the correct barcode';
}

function postcodeChangeToBarcode(postcode, allCodes) {
    let chckedPostcode = checkPostcode(postcode);

    return  chageToBarcode(chckedPostcode, allCodes);
}

module.exports = {
    checkBarcode: checkBarcode,
    formatBarcode: formatBarcode,
    checkBarcodeCd: checkBarcodeCd,
    changeToPostcode: changeToPostcode,
    barcodeChangeToPostcode: barcodeChangeToPostcode,
    loadAllCodes: loadAllCodes,
    checkPostcode: checkPostcode,
    chageToBarcode: chageToBarcode,
    postcodeChangeToBarcode: postcodeChangeToBarcode
};
