/* global cy */

import { expect } from 'chai';
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

	describe('Search Field', () => {
		it('should be displayed', () => {
			google.getElement(google.searchField).should('be.visible');
		});

		it('should display list of search after type "google"', () => {
			google.getElement(google.searchField).type('google');
			google.getElement(google.searchList).should('be.visible');
		});

		it('should display search results after type "google" and click enter', () => {
			google.getElement(google.searchField).clear().type('google{enter}');
			google.getElement(google.searchResult).should('be.visible').then(($element) => {
				const text = $element.text();
				expect(text).to.contain('نتيجة'); // sometimes "results" instead of "نتيجة" or vice versa
			});
			cy.go('back');
		});
	});

	describe('Feeling Lucky Button', () => {
		it('should redirect to "doodles" page', () => {
			google.clickElement(google.feelingLuckyButton);
			cy.url().then(($url) => {
				expect($url).to.contain('doodles');
			});
		});

		it('should display date box that includes text and social sharing icons', () => {
			google.getElement(google.topDateBox).should('be.visible');
			google.getElement(google.latestTitle).should('be.visible');
			google.getElement(google.socialSharingIcons).each(($li) => {
				cy.get($li).should('be.visible');
			});
			cy.go('back');
		});
	});
});
