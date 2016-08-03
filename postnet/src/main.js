"use strict";

let repl = require('repl');
let route = require('./route');


console.log(route().text);
//用户输入
function handleCmd(cmd, context, filename, done) {
    switchRoute({
        cmd: cmd.trim()
    }, done);
    done(null);
}
function switchRoute(context, done) {
    let result = route(context.cmd);
    console.log(result.text);
    if(result.rerun){
        console.log(route().text);
    }
    done(null);
}
let repInfo = repl.start({
    prompt: "> ",
    eval: handleCmd
});


