/**
 * Created by xjy on 8/3/16.
 */
let {barcodeToZipCode}=require("/home/xjy/ThoughtWorks/take-out-food/src/postnet-core.js");
module.exports=function (barcode) {
  let zipCode=barcodeToZipCode(barcode);
  if(zipCode===false){
    return{
      error:"Please give right input."
    }
  }else{
    return{
      text:zipCode,
      reset:true
    }
  }
};
