const base = require('./protractor.conf.js');

exports.config = {
	...base,
	multiCapabilities: [{
		browserName: 'chrome',
		chromeOptions: {
			args: [
				'--headless',
				'--disable-dev-shm-usage',
				'--no-sandbox',
			],
		},
		specs: /* !!specs!! */['./test/e2e/*.e2e-spec.js']/* /!!specs!! */,
		pageLoadStrategy: 'none',
		shardTestFiles: true,
		maxInstances: 3,
	}],
};
