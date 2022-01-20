/* global cy */

import { expect } from 'chai';
import { google } from '../src/GoogleHomePage';

describe('Desktop Google Homepage Functional Checks', () => {
	before(() => {
		cy.visit(google.path);
	});

	describe('Center Logo', () => {
		it('should be displayed and have correct src attribute', () => {
			google.getElement(google.googleCenterLogo).should('be.visible');
			google.getElement(google.googleCenterLogo).invoke('attr', 'src').should('contain', 'googlelogo');
		});
	});
});
