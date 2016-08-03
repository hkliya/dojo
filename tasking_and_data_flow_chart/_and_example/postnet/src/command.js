let {getPostToBar,getBarToPost} = require('./postnet');
function getMenu(){
    return {
        "name":"init",
        "menu":`1.barcode convert to postcode \n 2.postcode convert to barcode \n 3.quit`,
        "method":function(figure){
            switch(figure){
                case '1':
                    return "barcodetopostcode";
                case "2":
                    return "postcodetobarcode";
                case "3":
                    return "quit";
                default:
                    console.log("非法输入！请重新输入。。。");
                    return 'init';
            }
        }
    };
}
function BarcodeToPostcode(){
    return {
        "name":'barcodetopostcode',
        "menu":`1.please input bar code;\n 2.return main menu`,
        "method":function(figure){
            switch (figure){
                case '1':
                    return "dealbarcodetopostcode";
                case '2':
                    return "init";
                default:
                    console.log("非法输入！请重新输入。。。");
                    return "init";
            }
        }
    }
}
function dealBarcodeToPostcode(){
    return {
        "name":"dealbarcodetopostcode",
        "menu":'请输入：',
        "method":function(barcode){
            let result = getBarToPost(barcode);
            if(!result){
                result = "please input right input!";
            }
            console.log(result);
            return "barcodetopostcode";
        }
    };
}
function PostcodeToBarcode(){
    return {
        "name":'postcodetobarcode',
        "menu":`\n 1.please input post code;\n 2.return main menu`,
        "method":function(figure){
            switch (figure){
                case '1':
                    return "dealbarcodetopostcode";
                case '2':
                    return "init";
                default:
                    console.log("非法输入！请重新输入。。。");
                    return "init";
            }
        }
    };
}
function dealPostcodeToBarcode(){
    return {
        "name":"dealbarcodetopostcode",
        "menu":'请输入：',
        "method":function(postcode){
            let result = getPostToBar(postcode);
            if(!result){
                result = "please input right input!";
            }
            console.log(result);
            return "postcodetobarcode";
        }
    };
}
module.exports = {
    getMenu,
    BarcodeToPostcode,
    dealBarcodeToPostcode,
    PostcodeToBarcode,
    dealPostcodeToBarcode
}