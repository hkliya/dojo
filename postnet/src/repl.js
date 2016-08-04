let repl = require('repl');
let route = require('./route1');

console.log(route().text);//打印菜单

function handleCmd(cmd, context, filename, done) {
    switchRouter({
        cmd: cmd.trim()
    }, done);
    done(null);
}
function switchRouter(context, done) {
    let result = route(context.cmd);
    console.log(result.text);
    if(result.rerun){
        console.log(route().text);
    }
    done(null);
}
let replInfo = repl.start({prompt: "> ", eval: handleCmd});
