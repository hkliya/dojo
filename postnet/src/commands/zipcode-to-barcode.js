"use strict";
/**
 * Created by xjy on 8/3/16.
 */
let {zipCodeToBarcode}=require("/home/xjy/ThoughtWorks/take-out-food/src/postnet-core.js");
module.exports=function (zipcode){
  let barcode=zipCodeToBarcode(zipcode);
  if(barcode===false){
    return{
      error:'Please give right input.',
    }
  }else{
    return{
      text:barcode,
      reset:true
    }
  }
};
