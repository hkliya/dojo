/*global describe,it,expect*/
let {checkPostCode,formatPostCode,matchBarcodes,_getBarcodes,getBarcodeString,
    checkBarcode,formatBarCode,matchPostcode,getPostcodeString,getcodesObjects,getPostToBar,getBarToPost} = require('../src/postnet.js');

'use strict';
describe('post net', function () {
    it('邮编转条码',()=>{
        let input = '45056-1234';
        let output = getPostToBar(input);
        let expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(output).toEqual(expected);
    });
    it('条码转邮编',()=>{
        let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let output = getBarToPost(input);
        let expected = '45056-1234';
        expect(output).toEqual(expected);
    });
    it('检查五位位数正确',()=>{
        let input = '45056';
        let output = checkPostCode(input);
        let expected = '45056';
        expect(output).toEqual(expected);
    });
    it('检查九位位数正确',()=>{
        let input = '450561234';
        let output = checkPostCode(input);
        let expected = '450561234';
        expect(output).toEqual(expected);
    });
    it('检查十位位数正确',()=>{
        let input = '45056-1234';
        let output = checkPostCode(input);
        let expected = '45056-1234';
        expect(output).toEqual(expected);
    });
    it('检查四位位数错误',()=>{
        let input = '4503';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查六位位数错误',()=>{
        let input = '450345';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查八位位数错误',()=>{
        let input = '45034532';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查十一位位数错误',()=>{
        let input = '45012345678';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查字母数字错误',()=>{
        let input = '450w6-1234';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查纯字母错误',()=>{
        let input = 'awb-abcd';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查-的个数正确',()=>{
        let input = '12345-6789';
        let output = checkPostCode(input);
        let expected = '12345-6789';
        expect(output).toEqual(expected);
    });
    it('检查-的个数错误',()=>{
        let input = '1234506789';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('检查-的位置',()=>{
        let input = '1234-67890';
        let output = checkPostCode(input);
        let expected = false;
        expect(output).toEqual(expected);
    });
    it('format postcode',()=>{
        let input = '45035-1230';
        let output = formatPostCode(input);
        let expected ='450351230';
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
        let expected = false;
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