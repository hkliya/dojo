'use strict';
/*global describe,it,expect,*/
let {
    checkZipCode,
    zipCodeToNumberArray,
    checkCD,
    buildBarcode,
    zipCodeToBarcode,
    checkBarcode,
    calculateCD,
    buildZipCode,
    BarcodeToZipCode

} =require("../main/main.js");


describe('条码转邮编', () => {
  it('1# check zip code when code is TRUE', ()=> {
    let input ='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let result = checkZipCode(input);
    expect(result).toEqual(true)
  });

  it('1# check zip code when code length is FALSE', ()=> {
    let input = '|:|::|:|:|:||::|:|::||:::||:|:|::||::|::|||::|';
    let result = checkZipCode(input);
    expect(result).toEqual(false)
  });
  it('1# check zip code when code is NOT EXIST', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::||::::|';
    let result = checkZipCode(input);
    expect(result).toEqual(false);
  });
  it('1# check zip code when code have OTHER SYMBOL', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::X:||::|:|::||::|::|||:::|';
    let result = checkZipCode(input);
    expect(result).toEqual(false)
  });

  it('2# zip code to Number', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let result = zipCodeToNumberArray(input);
    expect(result).toEqual([4, 5, 0, 5, 6, 1, 2, 3, 4, 0])
  });

  it('3# check CD when inputs is FALSE', ()=> {
    let input = [4, 5, 0, 5, 6, 1, 2, 3, 4, 8];
    let result = checkCD(input);
    expect(result).toEqual(false);
  });

  it('3# check CD when inputs is TRUE', ()=> {
    let input = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
    let result = checkCD(input);
    expect(result).toEqual(true);
  });

  it('4# should build barcode', ()=> {
    let input = [4, 5, 0, 5, 6, 1, 2, 3, 4, 0];
    let result = buildBarcode(input);
    expect(result).toEqual('45056-1234')
  });

  it('5# zip code to barcode 7 29之前', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual('45056-1234')
  });

  it('5# 总测32位正确', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||::|:|:|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual('95713')
  });
  it('5#总测52位正确', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual('45056-1234')
  });
  it('5#总测31位错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||::|:||';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 总测33位错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||::|:|::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 总测51位错误', ()=> {
    let input ='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 总测53位错误', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 总测32位 左边：错误', ()=> {
    let input = ':|:|:::|:|:|:::|:::||::||::|:|:|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 总测32位 右边：错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||::|:|:|:';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5#总测52位 左边：错误', ()=> {
    let input = '::|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5#总测52位右边：错误', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||::::';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 其他字符 a 错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||::|a|:|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 其他字符 2 错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||::|2|:|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5#其他字符 # 错误', ()=> {
    let input ='|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||#::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5# 总测32位 校验位 错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||:|:::||';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5#总测52位 校验位 错误', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:::|||';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });

  it('5# 总测32位 两：三 |  错误', ()=> {
    let input = '||:|:::|:|:|:::|:::||::||:||||||';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });
  it('5#总测52位 两：三 |  错误', ()=> {
    let input = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|:::::|';
    let result = zipCodeToBarcode(input);
    expect(result).toEqual(false)
  });

});

describe('邮编转条码', () => {

  it('1# it should check Barcode when is TRUE',()=>{
    let input='45056-1234';
    let result=checkBarcode(input);
    expect(result).toEqual(true)
  });

  it('1# it should check Barcode when is not 5/9',()=>{
    let input='4505234';
    let result=checkBarcode(input);
    expect(result).toEqual(false);
  });

  it('1# it should check Barcode when is FALSE',()=>{
    let input='45052-3-43';
    let result=checkBarcode(input);
    expect(result).toEqual(false);
  });

 it('should calculate CD',()=>{
  let input='45056-1234';
   let result=calculateCD(input);
   expect(result).toEqual(0)
 });

  it('should build Zip Code',()=>{
    let inputs='45056-1234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=buildZipCode(0,inputs,codeArray);
    let expected=`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
    expect(result).toEqual(expected)
  });
  it('should Barcode To Zip Code总测 7 29 以前',()=>{
    let input='45056-1234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    let expected=`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
    expect(result).toEqual(expected)
  });

  it('总测 5 位 正确',()=>{
    let input='95713';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    let expected='||:|:::|:|:|:::|:::||::||::|:|:|';
    expect(result).toEqual(expected)
  });
  it('总测 9位 正确',()=>{
    let input='450561234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    let expected=`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
    expect(result).toEqual(expected)
  });
  it('总测 10 位 正确',()=>{
    let input='45056-1234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    let expected=`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
    expect(result).toEqual(expected)
  });
  it('总测 4 位 错误',()=>{
    let input='1234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
});
  it('总测 6 位 错误',()=>{
    let input='123456';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 8 位 错误',()=>{
    let input='12345678';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 11 位 错误',()=>{
    let input='12345678901';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
   });


  it('总测-的数量0 错误',()=>{
    let input='1234567890';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 -的数量1 正确',()=>{
    let input='45056-1234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    let expected=`|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|`;
    expect(result).toEqual(expected)
  });
  it('总测 -的数量2 错误',()=>{
    let input='45056-123-';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 -的位置在5 错误',()=>{
    let input='4505-61234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 -的位置在6 错误',()=>{
    let input='450561-234';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });

  it('总测   5位 特殊符号#  错误',()=>{
    let input='1234#';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测   9位 特殊符号#  错误',()=>{
    let input='12345#789';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测   10位 特殊符号#  错误',()=>{
    let input='12345#7890';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
   });
  it('总测 5位 字母 错误',()=>{
    let input='12a45';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 5位 字母 错误',()=>{
    let input='abced';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 9位 字母 错误 ',()=>{
    let input='12345a789';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });
  it('总测 10 位 正确',()=>{
    let input='12345-78Z0';
    let codeArray = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];
    let result=BarcodeToZipCode(input,codeArray);
    expect(result).toEqual(false)
  });

});