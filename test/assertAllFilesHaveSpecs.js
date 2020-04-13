const fs = require('fs');
const path = require('path');

/**
 * Find all files recursively in specific folder and ensure there is a matching .spec.js file
 * @param  {String} startPath    Path relative to this file or other file which requires this files
 * @return {Object}	All JS files missing spec files in provided directories
 */
function findMissingFilesInDir(startPath, resultObject = {}) {
	if (!fs.existsSync(startPath)) {
		console.error('Directory does not exist!', startPath);
		return resultObject;
	}

	const files = fs.readdirSync(startPath);
	files.forEach((file) => {
		const filename = path.join(startPath, file);
		const stat = fs.lstatSync(filename);
		// Temporarily exclude front end assets from search
		if (stat.isDirectory() && !filename.match(/\/src\/assets/)) {
			findMissingFilesInDir(filename, resultObject); // recurse
		} else if (filename && filename.match(/\.js$/) && !filename.match(/\.spec\.js$/)) {
			const specFilename = filename.replace(/\.js$/, '.spec.js');
			try {
				fs.lstatSync(specFilename);

				const fileContents = fs.readFileSync(specFilename);

				if (fileContents.indexOf(`require('./${file}');`) === -1
					&& fileContents.indexOf(`require('./${file.replace(/\.js$/, '')}');`) === -1
					&& fileContents.indexOf(`rewire('./${file}');`) === -1
					&& fileContents.indexOf(`rewire('./${file.replace(/\.js$/, '')}');`) === -1) {
					resultObject[filename] = {
						missingImport: true,
					};
				}

				if (fileContents.indexOf('describe(\'') === -1) {
					resultObject[filename] = {
						...resultObject[filename],
						missingDescribe: true,
					};
				}

				if (fileContents.indexOf('it(\'') === -1) {
					resultObject[filename] = {
						...resultObject[filename],
						missingTest: true,
					};
				}

				if (fileContents.indexOf('expect(') === -1) {
					resultObject[filename] = {
						...resultObject[filename],
						missingExpect: true,
					};
				}
			} catch (e) {
				resultObject[filename] = {
					missingSpec: true,
				};
			}
		}
		return false;
	});
	return resultObject;
}

const speclessFiles = findMissingFilesInDir(path.resolve('./src'));

if (Object.keys(speclessFiles).length) {
	console.error('Unexpected untested files found! Make sure your js files have specs.');
	console.error(speclessFiles);
	console.error();
	process.exit(1);
}
