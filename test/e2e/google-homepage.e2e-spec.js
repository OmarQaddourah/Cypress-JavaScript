/* global browser */

const utilities = require('./utils/utilities');
const google = require('./utils/GoogleHomePage');

describe('Desktop Google Homepage Functional Checks', () => {
    utilities.navigateTo(google.path);

    describe('Center Logo', () => {
        it('should be displayed', () => {
            const googleLogo = utilities.getElementById(google.googleCenterLogo);
            expect(googleLogo.isDisplayed()).toBe(true);
        });
    });
});
