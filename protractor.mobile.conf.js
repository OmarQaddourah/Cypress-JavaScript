const base = require('./protractor.conf.js');

exports.config = {
	...base,
	multiCapabilities: [{
		browserName: 'chrome',
		chromeOptions: {
			args: [
				'--window-size=375,667',
				'--headless',
				'--disable-dev-shm-usage',
				'--no-sandbox',
			],
			mobileEmulation: {
				deviceName: 'iPhone 8',
			},
		},
		specs: /* !!specs!! */['./test/e2e/*.e2e-mobile-spec.js']/* /!!specs!! */,
		shardTestFiles: true,
		pageLoadStrategy: 'none',
		maxInstances: 3,
	}],
};
