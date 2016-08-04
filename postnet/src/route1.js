let mainMenu = require('./command/goto-main.js');

const defaultmapping = {'*': mainMenu};

let mapping = defaultmapping;

function route(input) {
    let command = mapping[input] || mapping['*'];
    let response = command(input);
    if (response.error) {
        return {text: response.text};
    }
    if (response.reset) {
        mapping = defaultmapping;
        return {
            text: response.text,
            rerun: true
        }
    }
    if (response.newMapping) {
        mapping = response.newMapping;
       return {text: response.text}
    }
    else{
        return {text:response.text};
    }
}
module.exports = route;
