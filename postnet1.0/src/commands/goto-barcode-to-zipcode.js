/**
 * Created by SONY on 2016/8/3.
 */

module.exports = function (){
    return {
        text:"please input bar code",
        newmapping:{
            "*":require("./barcode-to-zipcode")
        }
    }
}