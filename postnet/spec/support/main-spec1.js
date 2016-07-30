/**
 * Created by amberylopez on 16-7-27.
 */
let {getFormattedBarcodes} = require('../src/main1');
describe('my posnet',() => {
   it('条码转编码 #1 格式化',() =>{
      let barcode = '45056-1234';
       let formatted = getFormattedBarcodes(barcode);
       let expectBarcode = '450561234';
       expect(formatted).toEqual(expectBarcode);
   });
});