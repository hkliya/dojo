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

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '95713';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = ':|:|:::|:|:|:::|:::||::||::|:|:|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = ':|:|:::|:|:|:::|:::||::||::|:|::';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:||';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:||';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:|::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = '45056-1234';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::::|';

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||||||:|:|:|:::|:::||::||::|:|:|';//内含错误编码

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||||:||:|:|:|:::|:::||::||::|:|:|';//内含错误编码

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|||::|:|:|:|:::|:::||::||::|:|:|';//内含错误编码

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|1235784596321458965123547jdteh|';//内含错误编码

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||:::::|:|:|:::|:::||::||::|:|:|';//内含错误编码

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|::::::|:|:|:::|:::||::||::|:|:|';//内含错误编码

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|:|::|:|:|:||::L:|:|::||::a::||::|:|::||::|::|||:::|';//有字母

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|:|::|:|:|:||::×:|:|::||::#::||::|:|::||::|::|||:::|';//有其他字符

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '|:|::|:|:|:||::2:|:|::||::0::||::|:|::||::|::|||:::|';//有数字

        let allCodes = loadAllCodes();

        let postcode = barcodeChangeToPostcode(barcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(postcode).toEqual(expected);
    });

    it('should barcodeChangeToPostcode', ()=> {
        const barcode = '||:|:::|:|:|:::|:::||::||::|:：:|';//校验位错误

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

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '45056-1234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '4505-61234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '45-5-61234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '4505461234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '450561-234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '45-0561234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '45056234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '15935784625';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '03542';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = '|||:::::||::|:|::|::|::|:|:||::|';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '0352';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '124630';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = 'A6s630';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = 'f1534&84625';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '-5056-1234';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });

    it('should postcodeChangeToBarcode', () =>{
        const postcode = '';

        let allCodes = loadAllCodes();

        let barcode = postcodeChangeToBarcode(postcode, allCodes);

        const expected = 'Please enter the correct barcode';

        expect(barcode).toEqual(expected);
    });
});
