let commandMainMenu = require('./commands/go-main-menu');

const defaultMapping = {
    '*': commandMainMenu
};

let mapping = defaultMapping;

function route(input) {
    let command = mapping[input] || mapping['*'];
    let response = command(input);

    if (response.newMapping) {
        mapping = response.newMapping;
        return {
            text: response.text
        }
    }

    if (response.error) {
        return {
            text: response.error
        };
    }

    if (response.reset) {
        mapping = defaultMapping;
        return {
            text: response.text,
            rerun: true
        };
    }
}

module.exports = route;

console.log(route().text);
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    let result = route(input.trim());

    console.log(result.text);
    if(result.rerun) {
        console.log(route().text);
    }
});
