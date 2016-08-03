"use strict";

let mainCommand = require('../commands/go-to-main-page');

let defaultMapping = {
    "*": mainCommand
};

let mapping = defaultMapping;
function route(input) {
    let command = mapping[input] || mapping["*"];
    let response = command(input);

    if (response.reset) {
        mapping = defaultMapping;
        return {
            text: response.text,
            rerun: true
        };
    }

    if (response.error) {
        return {
            text: response.error
        };
    }

    if (response.newMapping) {
        mapping = response.newMapping;
        return {
            text:response.text
        };
    }
    return {
        text:response.text
    };
}

module.exports = route;
// console.log(route());
// console.log(route('2'));
// console.log(route('12354'));
// console.log(route());
