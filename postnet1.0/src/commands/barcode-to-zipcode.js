/**
 * Created by SONY on 2016/8/3.
 */
let {getPostToBar} = require("../postnet");
module.exports = function (input) {
    let result = getPostToBar(input);
    if(result !== false){
        return {
            text:result,
            reset:true
        }
    }else {
        return {
            error:"please give right input"
        };
    }
}