/**
 * Parses the generated lcov.info file to check that all files have full function, branch, and line coverage.
 * Excludes whitelisted files not yet at 100% coverage.
 */
const fs = require('fs');

let fileContents;
try {
	fileContents = fs.readFileSync('./coverage/lcov.info', 'utf8');
} catch (e) {
	console.error('Unable to load coverage file!');
	console.error(e);
	console.error();
	process.exit(1);
	return;
}

const uncoveredWhitelist = [
	'/app/shared/apiService.js',
	'/app/video/videoStandalonePageService.js',
];

const coverageTypes = ['FN', 'BR', 'L'];
const uncoveredFiles = [];
fileContents.split('end_of_record').forEach((singleFile) => {
	const state = {};
	singleFile.split('\n').forEach((fileRecordEntry) => {
		const recordSlices = fileRecordEntry.split(':');
		if (recordSlices[0] === 'SF') {
			state.source = recordSlices[1];
		} else {
			coverageTypes.forEach((type) => {
				if (recordSlices[0] === `${type}F`) {
					state[`${type}-total`] = recordSlices[1];
				} else if (recordSlices[0] === `${type}H`) {
					state[`${type}-hit`] = recordSlices[1];
				}
			});
		}
	});

	// Don't fail on unexpected empty records
	if (Object.keys(state).length === 0) {
		return;
	}

	const uncovered = {};
	coverageTypes.forEach((type) => {
		if (state[`${type}-total`] !== state[`${type}-hit`]) {
			uncovered[type] = true;
		}
	});

	const isInWhitelist = uncoveredWhitelist.includes(state.source.split('/src')[1]);

	if (Object.keys(uncovered).length && !isInWhitelist) {
		uncovered.SOURCE = state.source;
		uncoveredFiles.push(uncovered);
	} else if (!Object.keys(uncovered).length && isInWhitelist) {
		console.log(`File ${state.source} is in the whitelist, but is fully covered. Remove it from the whitelist.`);
	}
});

if (uncoveredFiles.length) {
	console.error('Some files are not fully covered!');
	console.error(uncoveredFiles);
	console.error();
	process.exit(1);
} else {
	console.log('');
	console.log(`All files fully covered, except for ${uncoveredWhitelist.length} files ignored`);
	console.log('');
}
