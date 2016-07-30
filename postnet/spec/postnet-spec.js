/*global describe,it,expect*/
let {checkPostCode,formatPostCode,matchBarcodes,_getBarcodes,getBarcodeString,
    checkBarcode,formatBarCode,matchPostcode,getPostcodeString,getcodesObjects} = require('../src/postnet.js');

'use strict';
describe('post net', function () {
    it('check input postcode format 1',()=>{
        let input = '45056-1234';
        let output = checkPostCode(input);
        let expected = '45056-1234';
        expect(output).toEqual(expected);
    });
    it('check input postcode format 2',()=>{
        let input = '450';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('check input postcode format 3',()=>{
        let input = '450w6-1234';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('format postcode',()=>{
        let input = '45056-1234';
        let output = formatPostCode(input);
        let expected ='450561234';
        expect(output).toEqual(expected);
    });
    it('match postcode then get barcodes',()=>{
        let input = '450561234';
        let barocde = _getBarcodes();
        let output = matchBarcodes(input,barocde);
        let expected = [':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'];
        expect(output).toEqual(expected);
    })
    it('get barcodesString',()=>{
        let input = [':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|'];
        let output = getBarcodeString(input);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::||';
        expect(output).toEqual(expected);
    });
    it('check barcode format1',()=>{
        let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let output = checkBarcode(input);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(output).toEqual(expected);
    })
    it('check barcode format2',()=>{
        let input = '|:|::|:|:8:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let output = checkBarcode(input);
        let expected = false;
        expect(output).toEqual(expected);
    })
    it('format barcode',()=>{
        let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::||';
        let output = formatBarCode(input);
        let expected = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|';
        expect(output).toEqual(expected);
    })
    it('match barcode and get postcode',()=>{
        let input1 =':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
        let input2 = getcodesObjects();
        let output = matchPostcode(input1,input2);
        let expected =['4','5','0','5','6','1','2','3','4','0'];
        expect(output).toEqual(expected);
    });
    it('get postcodeString',()=>{
        let input = ['4','5','0','5','6','1','2','3','4','0'];
        let output = getPostcodeString(input);
        let expected = '45056-1234';
        expect(output).toEqual(expected);
    })
});
