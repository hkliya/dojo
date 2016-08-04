/**
 * Created by xjy on 8/3/16.
 */
module.exports=function () {
  return{
    text:"Please input bar code.",
    newMapping:{
      '*':require("./barcode-to-zipcode")
    }
  }
};
