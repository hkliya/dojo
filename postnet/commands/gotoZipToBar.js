/**
 * Created by zhuoyue on 16-8-3.
 */
let {translateZipcodeToBarcode}=require('./tranformZipToBar');
function gotoZipToBar() {
    return {
        text:`Please input zip code:`,
        newMapping:{"*":translateZipcodeToBarcode}
    }
}
module.exports={
    gotoZipToBar
};