/**
 * Created by SONY on 2016/8/3.
 */
let {getBarToPost} = require("../postnet");
module.exports = function (input) {
    let result = getBarToPost(input);
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