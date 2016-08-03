/**
 * Created by zhuoyue on 16-8-3.
 */
let {translateBarcodeToZipcode}=require('./tranformBarToZip');
function gotoBarToZip() {
    return {
        text:`Please input bar code:`,
        newMapping:{"*":translateBarcodeToZipcode}
    }
}
module.exports={
      gotoBarToZip
};