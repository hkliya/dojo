/*global describe, it, require, expect, _*/
'use strict';

let {
    checkBarcode,
    formatBarcode,
    checkBarcodeCd,
    changeToZipcode,
    barcodeChangeToZipcode,
    loadAllCodes,
    checkZipcode,
    chageToBarcode,
    zipcodeChangeToBarcode
}
    = require('../src/best-charge.js');

describe('postnet', function () {
    it('should checkBarcode', () => {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        const allCodes = loadAllCodes();

        let checkedBarcode = checkBarcode(barcode, allCodes);

        const expected = {
            isTrueBarcode: true,
            barcode
        };

        expect(checkedBarcode).toEqual(expected);
    });

    it('should formatBarcode', () => {
        const checkedBarcode = {
            isTrueBarcode: true,
            barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
        };

        let allCodes = loadAllCodes();

        let formatedBarcode = formatBarcode(checkedBarcode, allCodes);

        const expected = {
            isTrueBarcode: true,
            barcode: [
                ':|::|',
                ':|:|:',
                '||:::',
                ':|:|:',
                ':||::',
                ':::||',
                '::|:|',
                '::||:',
                ':|::|',
                '||:::'
            ]
        };

        expect(formatedBarcode).toEqual(expected);
    });

    it('shold checkBarcode', ()=> {
        const formatedBarcode = {
            isTrueBarcode: true,
            barcode: [
                ':|::|',
                ':|:|:',
                '||:::',
                ':|:|:',
                ':||::',
                ':::||',
                '::|:|',
                '::||:',
                ':|::|',
                '||:::'
            ]
        };

        const allCodes = loadAllCodes();

        let checkedBarcodeCd = checkBarcodeCd(formatedBarcode, allCodes);

        const expected = {
            isTrueBarcode: true,
            barcode: [4, 5, 0, 5, 6, 1, 2, 3, 4]
        };

        expect(checkedBarcodeCd).toEqual(expected);
    });

    it('should changeToZipcode', () => {
        const checkedBarcodeCd = {
            isTrueBarcode: true,
            barcode: [4, 5, 0, 5, 6, 1, 2, 3, 4]
        };

        let zipcode = changeToZipcode(checkedBarcodeCd);

        const expected = '45056-1234';

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：两边都是"|"：', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = '95713';

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode: 左边非"|": ', ()=> {
        const barcode = ':|:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode: 两边都不是"|" ', ()=> {
        const barcode = ':|:|:::|:|:|:::|:::||::||::|:|::';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：长度为32', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = '95713';

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode: 长度为31', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:||';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：长度为33：', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|::|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：长度为52：', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = '45056-1234';

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：长度为51：', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：长度为53：', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::::|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：正确编码2"|",3":" ', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = '95713';

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含编码5"|",0":" ', ()=> {
        const barcode = '||||||:|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含编码4"|",1":" ', ()=> {
        const barcode = '||||:||:|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含编码3"|",2":" ', ()=> {
        const barcode = '||||:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含编码1"|",4":" ', ()=> {
        const barcode = '|:|::::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含编码0"|",5":" ', ()=> {
        const barcode = '|::::::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含除"|"和":"之外的其他符号"', ()=> {
        const barcode = '|:::::$|:|:|:::|:::|#::||::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：内含字母', ()=> {
        const barcode = '|:|::|:|:|:||::L:|:|::||::a::||::|:|::||::|::|||:::|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：包含数字', ()=> {
        const barcode = '|9:|:::3:|:|:::|:::||::|2::|:|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：所有编码和校验码总和不是10的倍数', ()=> {
        const barcode = '|::||::|:|:|:::|:|:|:::|:||::|:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = '35752';

        expect(zipcode).toEqual(expected);
    });

    it('should barcodeChangeToZipcode：校验码错误，所有编码和校验码总和不是10的倍数', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:：:|';

        let allCodes = loadAllCodes();

        let zipcode = barcodeChangeToZipcode(barcode, allCodes);

        const expected = false;

        expect(zipcode).toEqual(expected);
    });

    it('should checkedZipcode', () => {
        const zipcode = '95713';

        let checkedZipcode = checkZipcode(zipcode);

        const expected = {
            isTrueZipcode: true,
            zipcode: '95713'
        };

        expect(checkedZipcode).toEqual(expected);
    });

    it('should changeToBarcode', () =>{
        const checkedZipcode = {
            isTrueZipcode: true,
            zipcode: '95713'
        };

        let allCodes = loadAllCodes();

        let barcode = chageToBarcode(checkedZipcode, allCodes);

        const expected = '||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode：正确长度：5位', () =>{
        const zipcode = '03542';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = '|||:::::||::|:|::|::|::|:|:||::|';

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode：长度错误：4位', () =>{
        const zipcode = '0352';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode：长度错误：6位', () =>{
        const zipcode = '124630';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode： 正确长度：9位', () =>{
        const zipcode = '136842796';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = '|:::||::||::||::|::|::|::|::|:||:::||:|:::||:::|::||';

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode： 正确长度：10位', () =>{
        const zipcode = '45056-1234';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode：长度错误：8位', () =>{
        const zipcode = '84627061';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode：长度错误：11位', () =>{
        const zipcode = '15935784625';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode: "-"的个数, 正确1个', () =>{
        const zipcode = '45056-1234';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode： "-"的个数（长度位10的）, 错误0个', () =>{
        const zipcode = '0825461934';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode： "-"的个数（长度位10的）, 错误2个', () =>{
        const zipcode = '12-5-61934';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode："-"的位置，正确第6位 ', () =>{
        const zipcode = '13684-2796';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = '|:::||::||::||::|::|::|::|::|:||:::||:|:::||:::|::||';

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode："-"的位置，错误第5位 ', () =>{
        const zipcode = '0985-61234';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode："-"的位置，错误第7位 ', () =>{
        const zipcode = '098526-234';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });


    it('should zipcodeChangeToBarcode：出现字母', () =>{
        const zipcode = 'A6s630';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });

    it('should zipcodeChangeToBarcode：出现其他字符', () =>{
        const zipcode = 'f1534&84625';

        let allCodes = loadAllCodes();

        let barcode = zipcodeChangeToBarcode(zipcode, allCodes);

        const expected = false;

        expect(barcode).toEqual(expected);
    });
});
