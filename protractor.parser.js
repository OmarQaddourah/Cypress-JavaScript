const fs = require('fs');

module.exports = {
	name: 'custom-flake-parser',
	parse: (protractorTestOutput) => {
		const failedSpecs = new Set([]);
		protractorTestOutput
			.replace(/\[chrome #01-\d+]/g, '')
			.split('\n')
			.filter(line => line.includes('"path":'))
			.forEach((element) => {
				const path = element.replace('"path":', '').replace(/"|,/g, '').trim();
				if (path) {
					failedSpecs.add(path);
				} else {
					console.error(`PARSER: Error parsing missing file path on input ${element}`);
				}
			});
		const arrFailedSpecs = [...failedSpecs];

		if (arrFailedSpecs.length) {
			const filename = protractorTestOutput.includes('e2e-mobile-spec.js') ? 'protractor.mobile.conf.js' : 'protractor.desktop.conf.js';

			const data = fs.readFileSync(filename, 'utf8');
			const result = data.replace(/\/\*\s+!!specs!!\s+\*\/.*\/\*\s+\/!!specs!!\s+\*\//g, `/* !!specs!! */['${arrFailedSpecs.join('\',\'')}']/* /!!specs!! */`);
			fs.writeFileSync(filename, result, 'utf8');
		}

		// specFiles to be re-run by protractor-flake
		// if an empty array is returned, all specs will be re-run
		return [...failedSpecs];
	},
};
