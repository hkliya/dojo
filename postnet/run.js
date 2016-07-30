/**
 * Created by SONY on 2016/7/27.
 */
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();