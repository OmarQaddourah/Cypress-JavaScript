// This reporter is made similar to the default JSON reporter, but with simplifications to make it more parsable
const mocha = require('mocha');

const events = {
	EVENT_TEST_FAIL: 'fail',
	EVENT_RUN_END: 'end',
};

function errorJSON(err) {
	const res = {};
	Object.getOwnPropertyNames(err).forEach((key) => {
		if (key !== 'stack') {
			res[key] = err[key];
		}
	}, err);
	return res;
}

function cleanCycles(obj) {
	const cache = [];
	return JSON.parse(JSON.stringify(obj, (key, value) => {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				return `${value}`;
			}
			cache.push(value);
		}

		return value;
	}));
}

function clean(test) {
	let err = test.err || {};
	if (err instanceof Error) {
		err = errorJSON(err);
	}

	return {
		title: test.title,
		fullTitle: test.fullTitle(),
		path: test.file,
		duration: test.duration,
		err: cleanCycles(err),
	};
}

function Reporter(runner) {
	mocha.reporters.Base.call(this, runner);
	const failures = [];
	runner.on(events.EVENT_TEST_FAIL, (test) => {
		failures.push(test);
	});

	runner.once(events.EVENT_RUN_END, () => {
		const obj = {
			failures: failures.map(clean),
		};

		runner.testResults = obj;
		process.stdout.write(JSON.stringify(obj, null, 2));
	});
}

module.exports = Reporter;
Reporter.description = 'Custom Mocha Reporter';
