/*global describe, it, require, expect, _*/
'use strict';

let {
    checkBarcode,
    formatBarcode,
    checkBarcodeCd,
    changeToPostcode,
    barcodeChangeToPostcode,
    loadAllCodes,
    checkPostcode,
    chageToBarcode,
    postcodeChangeToBarcode
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

    it('should changeToPostcode', () => {
        const checkedBarcodeCd = {
            isTrueBarcode: true,
            barcode: [4, 5, 0, 5, 6, 1, 2, 3, 4]
        };

        let postcode = changeToPostcode(checkedBarcodeCd);

        const expected = '45056-1234';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：两边都是"|"：', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '95713';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode: 左边非"|": ', ()=> {
        const barcode = ':|:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode: 两边都不是"|" ', ()=> {
        const barcode = ':|:|:::|:|:|:::|:::||::||::|:|::';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：长度为32', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '95713';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode: 长度为31', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:||';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：长度为33：', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：长度为52：', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '45056-1234';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：长度为51：', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：长度为53：', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：正确编码2"|",3":" ', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '95713';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含编码5"|",0":" ', ()=> {
        const barcode = '||||||:|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含编码4"|",1":" ', ()=> {
        const barcode = '||||:||:|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含编码3"|",2":" ', ()=> {
        const barcode = '||||:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含编码1"|",4":" ', ()=> {
        const barcode = '|:|::::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含编码0"|",5":" ', ()=> {
        const barcode = '|::::::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含除"|"和":"之外的其他符号"', ()=> {
        const barcode = '|:::::$|:|:|:::|:::|#::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：内含字母', ()=> {
        const barcode = '|:|::|:|:|:||::L:|:|::||::a::||::|:|::||::|::|||:::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：包含数字', ()=> {
        const barcode = '|9:|:::3:|:|:::|:::||::|2::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：所有编码和校验码总和不是10的倍数', ()=> {
        const barcode = '|::||::|:|:|:::|:|:|:::|:||::|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '35752';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode：校验码错误，所有编码和校验码总和不是10的倍数', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:：:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should checkedPostcode', () => {
        const postcode = '95713';

        let checkedPostcode = checkPostcode(postcode);

        const expected = {
            isTruePostcode: true,
            postcode: '95713'
        };

        expect(checkedPostcode).toEqual(expected);
    });

    it('should changeToBarcode', () =>{
        const checkedPostcode = {
            isTruePostcode: true,
            postcode: '95713'
        };

        let allCodes = loadAllCodes();

        let barcode = chageToBarcode(checkedPostcode, allCodes);

        const expected = '||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode：正确长度：5位', () =>{
        const postcode = '03542';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|||:::::||::|:|::|::|::|:|:||::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode：长度错误：4位', () =>{
        const postcode = '0352';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode：长度错误：6位', () =>{
        const postcode = '124630';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode： 正确长度：9位', () =>{
        const postcode = '136842796';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|:::||::||::||::|::|::|::|::|:||:::||:|:::||::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode： 正确长度：10位', () =>{
        const postcode = '45056-1234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode：长度错误：8位', () =>{
        const postcode = '84627061';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode：长度错误：11位', () =>{
        const postcode = '15935784625';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode: "-"的个数, 正确1个', () =>{
        const postcode = '45056-1234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode： "-"的个数（长度位10的）, 错误0个', () =>{
        const postcode = '0825461934';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode： "-"的个数（长度位10的）, 错误2个', () =>{
        const postcode = '12-5-61934';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode："-"的位置，正确第6位 ', () =>{
        const postcode = '13684-2796';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|:::||::||::||::|::|::|::|::|:||:::||:|:::||::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode："-"的位置，错误第5位 ', () =>{
        const postcode = '0985-61234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode："-"的位置，错误第7位 ', () =>{
        const postcode = '098526-234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });


    it('should postcodeChangeToBarcode：出现字母', () =>{
        const postcode = 'A6s630';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode：出现其他字符', () =>{
        const postcode = 'f1534&84625';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });
});
