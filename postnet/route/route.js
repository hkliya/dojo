/**
 * Created by zhuoyue on 16-8-3.
 */
let {getMenu}=require('../commands/goto-main-page');
const defaultMapping={"*":getMenu}
let mapping=defaultMapping;
//console.log(commandMainPage[1]);
function route(input){
    let command=mapping[input]||mapping["*"];
    //console.log(command);
    let response=command(input);
     //console.log(response);
    if(response.error){
        return{text:response.error}
    }
    if(response.reset){
        mapping=defaultMapping;
        return{
            text:response.text,
            return:true
        };
    }
    if(response.newMapping){
        mapping=response.newMapping;
        //console.log(mapping);
        return{
            text:response.text
        };
    }
    return{text:response.text}
}
module.exports={route}

//  console.log(route(1).text);//输入什么都是菜单
// // route("2");
// // console.log(route("12345").text);
// console.log(route("3").text);
// console.log(route("3").text);
//  //console.log(route("3"));
// //console.log(route("3").text);
// //console.log(route("|:::||::|:|::||::|::|:|:|::|:|:|"));