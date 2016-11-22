/**
 * Created by SONY on 2016/8/3.
 */
module.exports = function (){
    return {
        text:"please input zip code",
        newmapping:{
            "*":require("./zipcode-to-barcode")
        }
    }
}