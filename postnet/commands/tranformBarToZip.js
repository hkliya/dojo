/**
 * Created by zhuoyue on 16-8-3.
 */

let {BarcodeToZipCode}=require('../core/main');
function  translateBarcodeToZipcode(zipcode){
    let coreResponse = BarcodeToZipCode(zipcode);

    if(coreResponse ===false){
        return{
            error:'please input right input',
        }
    }else{
        return {
            text:'translateResult is :  ' + coreResponse,
            reset:true
        };
    }
}
module.exports={
    translateBarcodeToZipcode
};