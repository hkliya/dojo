/**
 * Created by SONY on 2016/8/3.
 */
let gotomainpage = require("./commands/goto-main-page");
const defaultMapping = {
    "*":gotomainpage
};
let mapping = defaultMapping;

function route(input){
    let command = mapping[input] || mapping["*"];
    let response = command(input);

    if(response.error){
        return {
            text:response.error
        }
    }
    if(response.reset){
        mapping = defaultMapping;
        return {
            text:response.text,
            rerun:true
        }
    }
    if(response.newmapping){
        mapping = response.newmapping;
        return {
            text:response.text
        }
    }
    return {
        text:response.text
    }
}
module.exports = route;
console.log(route(1).text)
console.log(route("2").text)
console.log(route("12345").text)