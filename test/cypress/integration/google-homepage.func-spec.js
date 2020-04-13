/* global cy */

import { google } from '../src/GoogleHomePage';

describe('Desktop Google Homepage Functional Checks', () => {
	before(() => {
		cy.visit(google.path);
	});

	describe('Center Logo', () => {
		it('should be displayed', () => {
			google.getElement(google.googleCenterLogo).should('be.visible');
		});
	});
});
