/**
 * Created by zhuoyue on 16-8-3.
 */
let {zipCodeToBarcode}=require('../core/main');
function translateZipcodeToBarcode(barcode)  {
    let coreResponse = zipCodeToBarcode(barcode);

    if(coreResponse === false){
        return{
            error:'please input right input',
        };
    }else{
        return {
            text:'translateResult is :  ' + coreResponse,
            reset:true
        };
    }
}
module.exports={
    translateZipcodeToBarcode
};