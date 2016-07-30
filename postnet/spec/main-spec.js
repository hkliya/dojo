/*global describe,it,expect*/
let {getformatted, formattedGroup, buildAll, checkcode, printPostcode, print, checkedPostcode, printBarcodes, buildBarcodes, compositeBarcodes, calculatCheck, finialPostcode} = require('../src/main.js');
let {loadAllBarcodes} = require('../src/barcodes.js');

describe('my', () => {
    it('邮编转条码 #1 检验邮编并格式化', () => {
        let postcode = '45056-1234';
        let fomattefPostcode = checkedPostcode(postcode);
        let expectPostcode = [{
            no: '450561234'
        }];
        expect(fomattefPostcode).toEqual(expectPostcode);
    });
    it('邮编转条码 #2 格式化条码成为数组', () => {
        let fomattefPostcode = [{
            no: '450561234'
        }];
        let Barcodes = buildBarcodes(fomattefPostcode);
        let expectBarcodes = [
            {no: '4'},
            {no: '5'},
            {no: '0'},
            {no: '5'},
            {no: '6'},
            {no: '1'},
            {no: '2'},
            {no: '3'},
            {no: '4'}];
        expect(Barcodes).toEqual(expectBarcodes);
    });
    it('邮编转条码 #3 综合条码信息', ()=> {
        let barcodes = [
            {no: '4'},
            {no: '5'},
            {no: '0'},
            {no: '5'},
            {no: '6'},
            {no: '1'},
            {no: '2'},
            {no: '3'},
            {no: '4'}];
        let allBarcods = loadAllBarcodes();
        let expectBarcodesItems = compositeBarcodes(barcodes, allBarcods);
        let expectBarcodes = [
            { no: '4', code: ':|::|'},
            { no: '5', code: ':|:|:'},
            { no: '0', code: '||:::'},
            { no: '5', code: ':|:|:'},
            { no: '6', code: ':||::'},
            { no: '1', code: ':::||'},
            { no: '2', code: '::|:|'},
            { no: '3', code: '::||:'},
            { no: '4', code: ':|::|'}
        ];
        expect(expectBarcodesItems).toEqual(expectBarcodes);

    });

    it('邮编转条码 #4 计算检验码', () => {
        let barcodes = [
            { no: '4', code: ':|::|'},
            { no: '5', code: ':|:|:'},
            { no: '0', code: '||:::'},
            { no: '5', code: ':|:|:'},
            { no: '6', code: ':||::'},
            { no: '1', code: ':::||'},
            { no: '2', code: '::|:|'},
            { no: '3', code: '::||:'},
            { no: '4', code: ':|::|'}
        ];
        let allBarcods = loadAllBarcodes();
        let calculate = calculatCheck(barcodes, allBarcods);
        let expectCaculateCheck = [{no: '0', code: '||:::'}];
        expect(calculate).toEqual(expectCaculateCheck);
    });

    it('邮编转条码 #5 输出条码', () => {
        let check = [{no: '0', code: '||:::'}];
        let barcodes = [
            { no: '4', code: ':|::|'},
            { no: '5', code: ':|:|:'},
            { no: '0', code: '||:::'},
            { no: '5', code: ':|:|:'},
            { no: '6', code: ':||::'},
            { no: '1', code: ':::||'},
            { no: '2', code: '::|:|'},
            { no: '3', code: '::||:'},
            { no: '4', code: ':|::|'}

        ];
        let print = printBarcodes(barcodes, check);
        let expectBarcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        expect(print).toEqual(expectBarcode);
    });

    it('条码转邮编 #1 格式化(去掉两侧|)', () => {
        let barcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';//'45056-1234'
        let formattedBarcode = getformatted(barcode);
        let expectBarcode = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
        expect(formattedBarcode).toEqual(expectBarcode);
    });
    it('条码转邮编 #2 格式化(5个分组)', () => {
        let formatted = ':|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::';
        let formattedBarcodes = formattedGroup(formatted);
        let expectcode = [
            {code: ':|::|'},
            {code: ':|:|:'},
            {code: '||:::'},
            {code: ':|:|:'},
            {code: ':||::'},
            {code: ':::||'},
            {code: '::|:|'},
            {code: '::||:'},
            {code: ':|::|'},
            {code: '||:::'}
        ];
        expect(formattedBarcodes).toEqual(expectcode);
    });
    it('条码转邮编 #3 查找条码对应数字', () => {
        let codes = [
            {code: ':|::|'},
            {code: ':|:|:'},
            {code: '||:::'},
            {code: ':|:|:'},
            {code: ':||::'},
            {code: ':::||'},
            {code: '::|:|'},
            {code: '::||:'},
            {code: ':|::|'},
            {code: '||:::'}];
        let allBarcodes = loadAllBarcodes();
        let buildAllCode = buildAll(codes, allBarcodes);
        let expectCode = [
            {no: '4', code: ':|::|'},
            {no: '5', code: ':|:|:'},
            {no: '0', code: '||:::'},
            {no: '5', code: ':|:|:'},
            {no: '6', code: ':||::'},
            {no: '1', code: ':::||'},
            {no: '2', code: '::|:|'},
            {no: '3', code: '::||:'},
            {no: '4', code: ':|::|'},
            {no: '0', code: '||:::'}];
        expect(buildAllCode).toEqual(expectCode);
    });
    it('条码转邮编 #3 验证检验码并组合为编码', () => {
        let codes = [
            {no: '4', code: ':|::|'},
            {no: '5', code: ':|:|:'},
            {no: '0', code: '||:::'},
            {no: '5', code: ':|:|:'},
            {no: '6', code: ':||::'},
            {no: '1', code: ':::||'},
            {no: '2', code: '::|:|'},
            {no: '3', code: '::||:'},
            {no: '4', code: ':|::|'},
            {no: '0', code: '||:::'}];
        let check = checkcode(codes);
        let expectcode = '450561234';
        expect(check).toEqual(expectcode);

    });
    it('条码转邮编 #4 输出邮编', () => {

        let code = '450561234';
        let postcode = printPostcode(code);
        let expectPostcode = '45056-1234';
        expect(postcode).toEqual(expectPostcode);
    });

   it('5位邮编转条码集成测试（正确）', () => {

        let postcode = '45056';
        let expectpostcod = '|:|::|:|:|:||::::|:|::||::||:::|';
        let finialpostcod = print(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('9位邮编转条码集成测试（正确）', () => {

        let postcode = '450561234';
        let expectpostcod = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let finialpostcod = print(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('10位邮编转条码集成测试（正确）', () => {
        let postcode = '45056-1234';
        let expectpostcod = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let finialpostcod = print(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('邮编转条码集成测试（位数错误）', () => {

        let postcode = '23450506545';
        let expectpostcod = '邮编格式错误！';
        let finialpostcod = print(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('邮编转条码集成测试（非法字符）', () => {

        let postcode = '454602.35';
        let expectpostcod = '邮编格式错误！';
        let finialpostcod = print(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('邮编转条码集成测试（-位置不正确）', () => {

        let postcode = '12345-678';
        let expectpostcod = '邮编格式错误！';
        let finialpostcod = print(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    //条码转邮编

    it('5位条码转邮编集成测试（正确）', () => {

        let postcode = '|:|::|:|:|:||::::|:|::||::||:::|';
        let expectpostcod = '45056';
        let finialpostcod = finialPostcode(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('9位条码转邮编集成测试（正确）', () => {

        let postcode = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
        let expectpostcod = '45056-1234';
        let finialpostcod = finialPostcode(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('条码转邮编集成测试（位数错误）', () => {

        let postcode = '|:|::|:|:|:||::::|:|:|';
        let expectpostcod = '条码格式错误！';
        let finialpostcod = finialPostcode(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    it('条码转邮编集成测试（检验码错误）', () => {

        let postcode = '|:|::|:|:|:||::::|:|::||:::|::||';//5位
        let expectpostcod = '检验码有误！';
        let finialpostcod = finialPostcode(postcode);
        expect(finialpostcod).toEqual(expectpostcod);
    });
    // it('条码转邮编集成测试（中文符号错误）', () => {
    //
    //     let postcode = '|:|::|:|:|:||::::|:|::||::||::：|';//5位
    //     let expectpostcod = '中文符号有误！';
    //     let finialpostcod = finialPostcode(postcode);
    //     expect(finialpostcod).toEqual(expectpostcod);
    // });
});


