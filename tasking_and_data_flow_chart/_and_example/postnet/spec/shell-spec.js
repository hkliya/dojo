/**
 * Created by SONY on 2016/8/1.
 */
let {showmenu, validateFigure, convertToBar, convertToZip, routeFigure, routeConvertToBar, routeConvertToZip} = require('../src/command.js');

describe('test shell',() => {
    it('should get menu',() => {
        let expected = `    1. Translate zip code to bar code
    2. Translate bar code to zip code
    3. Quit
    Please input your choices(1~3)`;
        let output = showmenu();
        expect(output).toEqual(expected);
    });
})