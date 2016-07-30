/**
 * Created by SONY on 2016/7/26.
 */
let _ = require('lodash');
function _getBarcodes(){
    return ['||:::',':::||','::|:|','::||:',':|::|',':|:|:',':||::','|:::|','|::|:','|:|::'];
}
function checkPostCode(postcode){
    let flag = false;
    if(postcode.length ===5 || postcode.length === 9 || (postcode.length === 10 && postcode.charAt(5) === '-')){
        postcodeno = postcode.replace('-','').split('');
        let temp = postcodeno.map((element)=>{
            let reg =/\d/;
            return reg.test(element)
        });
        if(!temp.includes(false)){
            flag = true;
        }
    }
    if(flag){
        return postcode;
    }else{
        return flag;
    }
}
function formatPostCode(postcode){
    if(postcode !== false){
        if(postcode.includes('-')){
            let temp = postcode.split('-');
            postcode = temp[0]+temp[1];
        }
    }
    return postcode;
}
function matchBarcodes(postcode,barcodes){
    let postcodes = postcode.split('');
    let postcodesInt = postcodes.map((postcode)=>{
        return parseInt(postcode);
    });
    let sum = _.sum(postcodesInt);
    if(sum % 10 === 0){
        postcodes.push('0');
    }else{
        postcodes.push(parseFloat( ));
    }
    return postcodes.map((postcode)=>{
        return  barcodes[parseInt(postcode)];
    });
}
function getBarcodeString(barcodes){
    let barcodeString = '|';
    let codesString = barcodes.join('');
    barcodeString += codesString;
    barcodeString += '|';
    return barcodeString;
}
//条码转邮编
function getcodesObjects(){
    return [
        {no:'0',code:'||:::'},{no:'1',code:':::||'},{no:'2',code:'::|:|'},{no:'3',code:'::||:'},{no:'4',code:':|::|'},
        {no:'5',code:':|:|:'},{no:'6',code:':||::'},{no:'7',code:'|:::|'},{no:'8',code:'|::|:'},{no:'9',code:'|:|::'}
    ];
}
function checkBarcode(barcode){
    if(barcode.length === 32 || barcode.length === 52  ){
        if( barcode.charAt(0)==='|' && barcode.charAt(barcode.length-1)==='|'){
            let temp = barcode.split('').map((element)=>{
                let reg =/\d/;
                return reg.test(element); //匹配有其他字符,数字，特殊字符等
            });
            if(!temp.includes(true)){
                let codearr = barcode.substring(1,barcode.length-2);
                let flag = _.chain(codearr).split('').chunk(5).map(item => item.join('')).map(n => _getBarcodes().includes(n)).value();
                if(flag.includes(false)){
                    return false;
                }else{
                    return barcode;
                }

            }
        }
    }
    return false;
}
function formatBarCode(barcode){
    return  barcode.substring(1,barcode.length-1);
}
function matchPostcode(barcode,allcodes){
    let temps = _.chunk(barcode.split(''),5);
    let newBarcodes =  temps.map((temp)=>{
        return temp.join('');
    });
    return newBarcodes.map((newbarcode)=>{
        let code = allcodes.find((code)=> code.code === newbarcode );
        return code.no;
    });
}
function getPostcodeString(postcode){
    let codes = _.dropRight(postcode);
    if(codes.length === 9){
        codes.splice(5,0,'-');
    }
    return codes.join('');
}
let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
console.log(checkBarcode(input));
module.exports = {
    checkPostCode:checkPostCode,
    formatPostCode:formatPostCode,
    matchBarcodes:matchBarcodes,
    _getBarcodes:_getBarcodes,
    getBarcodeString:getBarcodeString,
    checkBarcode:checkBarcode,
    formatBarCode:formatBarCode,
    matchPostcode:matchPostcode,
    getPostcodeString:getPostcodeString,
    getcodesObjects:getcodesObjects
};
