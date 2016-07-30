/*global describe,it,expect*/
"use strict";
let {barcodeToZipCode, formatCheckedBarcode, transformBarCodes} = require('../src/main');
let {formatZipCode, transformZipCode, zipCodeToBarcode} = require('../src/main');

let {loadAllCode} = require('../src/codes');

describe('transform-code', function () {

    xdescribe('综合测试 barcode to zipCode', ()=> {
        it('barcode to zipCode 五位合法', ()=> {
            let codes = '45056';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '|:|::|:|:|:||::::|:|::||::||:::|', type: true};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 九位合法', ()=> {
            let codes = '450561234';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|', type: true};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 十位正确', ()=> {
            let codes = '45056-1234';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|', type: true};
            expect(postcodesToBarcode).toEqual(expected);
        });

        it('barcode to zipCode 位数错误 四位', ()=> {
            let codes = '4106';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 位数错误 六位', ()=> {
            let codes = '4106s2';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 位数错误 八位', ()=> {
            let codes = '41061234';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 位数错误 十一位', ()=> {
            let codes = '41061234123';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });

        it('barcode to zipCode ‘-’个数【四位】', ()=> {
            let codes = '4-056';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode ‘-’个数【十位】', ()=> {
            let codes = '40612-3409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });

        it('barcode to zipCode 五位不合法', ()=> {
            let codes = '4.056';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });

        it('barcode to zipCode 十位不合法(全数字)', ()=> {
            let codes = '4006123409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 十位不合法(非法字符)', ()=> {
            let codes = '4-06123409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 十位不合法(-正确，前半段存在小数点)', ()=> {
            let codes = '4.061-3409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 十位不合法(-正确，前半段存在小数点)', ()=> {
            let codes = '42061-3.09';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });

        it('barcode to zipCode 九位不合法(非法字符)', ()=> {
            let codes = '4s0613409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 九位不合法(-的位置正确)', ()=> {
            let codes = '41061-409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
        it('barcode to zipCode 九位不合法(-的位置正确)', ()=> {
            let codes = '41061.409';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });


        it('barcode to zipCode 位数错误 高十位', ()=> {
            let codes = '4106123456';
            let postcodesToBarcode = barcodeToZipCode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(postcodesToBarcode).toEqual(expected);
        });
    });

    describe('综合测试-zipCode to barcode', ()=> {
        it('barcode to postcode 五十二位正确', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '45056-1234', type: true};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 三十二位正确', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||::||:::|';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '45056', type: true};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 【31位】', ()=> {
            let barcode = '|:::||::|:|::||::|::|:|:|:|:|:|';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 【33位】', ()=> {
            let barcode = '|:::||::|:|::||::|::|:|:|::|:|:||';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 【51位】', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::|';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 【53位】', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::||';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });

        it('barcode to postcode 三十二位(存在其他字符)', ()=> {
            let barcode = '|:::||::|:|:s||::|::|:|:|::|:|:|';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 五十二位(存在其他字符)', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||::::s||::|:|::||::|::|||:::|';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });


        xit('barcode to postcode 五十二位（5位字符串在allCodes中匹配不到）', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||||||';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });

        it('barcode to postcode 三十二位校验码错误', ()=> {
            let barcode = '|:::||::|:|::||::|::|:|:|::::|||';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });
        it('barcode to postcode 五十二位校验码错误', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:|::||';
            let barcodeToPostcodes = zipCodeToBarcode(barcode);
            let expected = {text: '不合法', type: false};
            expect(barcodeToPostcodes).toEqual(expected);
        });
    });
    describe('单元测试', ()=> {
        it('for mat postcode 十位合法', ()=> {
            let codes = '45056-1234';
            let formattedPostcode = formatCheckedBarcode(codes);
            let expected = ['4', '5', '0', '5', '6', '1', '2', '3', '4'];
            expect(formattedPostcode).toEqual(expected);
        });
        it('for mat postcode 十位不合法', ()=> {
            let codes = '4sd56-1234';
            let formattedPostcode = formatCheckedBarcode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(formattedPostcode).toEqual(expected);
        });
        it('for mat postcode 五位合法', ()=> {
            let codes = '42345';
            let formattedPostcode = formatCheckedBarcode(codes);
            let expected = ['4', '2', '3', '4', '5'];
            expect(formattedPostcode).toEqual(expected);
        });
        it('for mat postcode 五位不合法', ()=> {
            let codes = '42we5';
            let formattedPostcode = formatCheckedBarcode(codes);
            let expected = {text: '邮编不合法', type: false};
            expect(formattedPostcode).toEqual(expected);
        });
        it('transform barcode', ()=> {
            let formattedBarcode = ['4', '5', '0', '5', '6', '1', '2', '3', '4'];
            let allCodes = loadAllCode();
            let barcodeArray = transformBarCodes(formattedBarcode, allCodes);
            let expected = [
                {No: '4', code: ':|::|'},
                {No: '5', code: ':|:|:'},
                {No: '0', code: '||:::'},
                {No: '5', code: ':|:|:'},
                {No: '6', code: ':||::'},
                {No: '1', code: ':::||'},
                {No: '2', code: '::|:|'},
                {No: '3', code: '::||:'},
                {No: '4', code: ':|::|'},
                {No: '0', code: '||:::'}
            ];
            expect(barcodeArray).toEqual(expected);
        });

        it('for mat barcode', ()=> {
            let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
            let formattedBarcode = formatZipCode(barcode);
            let expected = {
                text: [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::'],
                type: true
            };
            expect(formattedBarcode).toEqual(expected);
        });
        it('for mat barcode', ()=> {
            let formattedBarcode = [':|::|', ':|:|:', '||:::', ':|:|:', ':||::', ':::||', '::|:|', '::||:', ':|::|', '||:::'];
            let allCodes = loadAllCode();
            let zipCodeArray = transformZipCode(formattedBarcode, allCodes);
            let expected = [
                {No: '4', code: ':|::|'},
                {No: '5', code: ':|:|:'},
                {No: '0', code: '||:::'},
                {No: '5', code: ':|:|:'},
                {No: '6', code: ':||::'},
                {No: '1', code: ':::||'},
                {No: '2', code: '::|:|'},
                {No: '3', code: '::||:'},
                {No: '4', code: ':|::|'},
                {No: '0', code: '||:::'}
            ];
            expect(zipCodeArray).toEqual(expected);
        });
    });

});



