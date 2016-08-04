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
        let postcodeno = postcode.replace('-','').split('');
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
    if(postcode !== false){
        let postcodes = postcode.split('');
        let postcodesInt = postcodes.map((postcode)=>{
            return parseInt(postcode);
        });
        let sum = _.sum(postcodesInt);
        if(sum % 10 === 0){
            postcodes.push('0');
        }else{
            postcodes.push(parseFloat(10 - sum % 10 ));
        }
        return postcodes.map((postcode)=>{
            return  barcodes[parseInt(postcode)];
        });
    }
  return false;
}
function getBarcodeString(barcodes){
    if(barcodes !== false){
        let barcodeString = '|';
        let codesString = barcodes.join('');
        barcodeString += codesString;
        barcodeString += '|';
        return barcodeString;
    }
    return false;
}
function getPostToBar(postcode){
    let checkedcode = checkPostCode(postcode);
    let formattedcode = formatPostCode(checkedcode);
    let matchcode = matchBarcodes(formattedcode,_getBarcodes());
    let barcodeString = getBarcodeString(matchcode);
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
    if(barcode !== false){
        return  barcode.substr(1,barcode.length-1);
    }
    return false;
}
function matchPostcode(barcode,allcodes){
    if(barcode !== false){
        let temps = _.chunk(barcode.split(''),5);
        let newBarcodes =  temps.map((temp)=>{
            return temp.join('');
        });
        return newBarcodes.map((newbarcode)=>{
            let code = allcodes.find((code)=> code.code === newbarcode );
            return code.no;
        });
    }
    return false;
}
function getPostcodeString(postcode){
    if(postcode !== false){
        let codes = _.dropRight(postcode);
        if(codes.length === 9){
            codes.splice(5,0,'-');
        }
        return codes.join('');
    }
    return false;
}
function getBarToPost(barcode){
    let checkedcode = checkBarcode(barcode);
    //console.log(checkedcode);
    let formattedcode = formatBarCode(checkedcode);
    let mattedcode = matchPostcode(formattedcode,getcodesObjects());
    let postcodeString = getPostcodeString(mattedcode);
    return postcodeString;
}
let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
console.log(getBarToPost(input));
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
    getcodesObjects:getcodesObjects,
    getPostToBar:getPostToBar,
    getBarToPost:getBarToPost
};