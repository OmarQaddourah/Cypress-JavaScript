const chai = require('chai');
global.sinon = require('sinon');
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;

chai.should();
chai.use(require('sinon-chai'));
