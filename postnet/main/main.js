/**
 * Created by zhuoyue on 16-8-3.
 */
let {route} = require('../route/route');
const repl = require('repl');

//let status = 'init';
console.log(route("").text);
//接受用户输入
function handleCmd(cmd, context, filename, done) {
    switchRouter({
        cmd: cmd.trim()
    }, done);

    done(null);
}
repl.start({prompt: "> ", eval: handleCmd});
function switchRouter(context, done) {
    let result = route(context.cmd);
    console.log(result.text);
    done(null);
}