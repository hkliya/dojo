/**
 * Created by xjy on 8/3/16.
 */
"use strict";
module.exports=function(){
  return {
    text:"Please input zip code.",
    newMapping:{
      "*":require('./zipcode-to-barcode')
    }
  }
};
