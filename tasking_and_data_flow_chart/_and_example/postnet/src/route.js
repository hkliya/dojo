
const repl = require("repl");

let {getMenu, BarcodeToPostcode, dealBarcodeToPostcode, PostcodeToBarcode, dealPostcodeToBarcode} = require('./command');
let mapping = [getMenu(), BarcodeToPostcode(), dealBarcodeToPostcode(), PostcodeToBarcode(), dealPostcodeToBarcode()];
let status = 'init';
console.log(mapping.find(item => item.name === status).menu);
//接受用户输入
function handleCmd(cmd, context, filename, done) {
    switchRouter({
        cmd: cmd.trim()
    }, done);
    done(null);
}
let replInfo = repl.start({prompt: "> ", eval: handleCmd});
function switchRouter(context, done) {
    let route = mapping.find(item => item.name === status);
    let result = route.method(context.cmd);
    let newRoute = mapping.find(item => item.name === result);

    status = newRoute.name;
    console.log(newRoute.menu);
    done(null);
}
