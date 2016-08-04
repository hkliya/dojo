/**
 * Created by xjy on 8/3/16.
 */
let commandZipCodeToBarcodePage = require("./commands/goto-zipcode-to-barcode-page");
//console.log(commandZipCodeToBarcodePage);
let {getMenu}=require('./commands/goto-main-page');
//console.log(getMenu);
const defaultMapping={"*":getMenu};
let mapping=defaultMapping;
function route(input) {
  let command=mapping[input]||mapping["*"];
  let response=command(input);
  if(response.error){
    return{
      text:response.error
    };
  }
  if(response.reset){
    mapping=defaultMapping;
    return {
      text:response.text,
      reset:true
    };
  }
  if(response.newMapping){
    mapping=response.newMapping;
    return{
      text:response.text
    };
  }
  return {
    text:response.text
  }
}
console.log(route().text);
module.exports=route;
