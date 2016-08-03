/**
 * Created by zhuoyue on 16-8-3.
 */
let {gotoZipToBar}=require('./gotoZipToBar');
let {gotoBarToZip}=require('./gotoBarToZip');
let {exit}=require('./exit');
let {invalid}=require('./invalid-input.js');

function getMenu(){
    return  {
        text:`1. Translate zip code to bar code
              2. Translate bar code to zip code
              3. Quit
              Please input your choices(1~3)`,
        newMapping:{
            "1":gotoZipToBar,
            "2":gotoBarToZip,
            "3":exit,
            "*":invalid
        }
    };
}
module.exports={
    getMenu
};
//console.log(getMenu().newMapping["1"]);