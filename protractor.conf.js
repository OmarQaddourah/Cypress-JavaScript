/* global browser */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

module.exports = {
	allScriptsTimeout: process.env.TIMEOUT || 45000,
	directConnect: true,
	baseUrl: process.env.TEST_BASE_URL || 'https://www.google.com/',
	framework: 'mocha',
	getPageTimeout: 10000,
	mochaOpts: {
		reporter: 'spec',
		timeout: 60000,
	},
	onPrepare: () => {
		global.chai = chai;
		global.expect = chai.expect;
		chai.use(chaiAsPromised);
	},
};
